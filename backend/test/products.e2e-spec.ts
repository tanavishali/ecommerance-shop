import { TestApp } from './test-app';

describe('Products routes (/api/products)', () => {
  const t = new TestApp();
  let adminToken: string;

  beforeAll(async () => {
    await t.start();
    adminToken = await t.adminToken();
  });
  afterAll(() => t.stop());

  const validProduct = {
    name: 'Test Widget',
    description: 'A widget for testing',
    price: 19.99,
    imageUrl: 'https://example.com/widget.png',
    category: 'Gadgets',
    stock: 10,
  };

  describe('GET /api/products (public list)', () => {
    it('returns a paginated list with metadata', async () => {
      const res = await t.http().get('/api/products').expect(200);

      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toMatchObject({
        page: 1,
        limit: 12,
      });
      expect(typeof res.body.total).toBe('number');
      expect(typeof res.body.totalPages).toBe('number');
      // Seed inserts 20 products.
      expect(res.body.total).toBeGreaterThanOrEqual(20);
    });

    it('honours the limit and page query params', async () => {
      const res = await t.http().get('/api/products?limit=5&page=2').expect(200);
      expect(res.body.data.length).toBeLessThanOrEqual(5);
      expect(res.body).toMatchObject({ page: 2, limit: 5 });
    });

    it('filters by search term (case-insensitive)', async () => {
      const res = await t.http().get('/api/products?search=headphones').expect(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      res.body.data.forEach((p: any) =>
        expect(p.name.toLowerCase()).toContain('headphones'),
      );
    });

    it('filters by category', async () => {
      const res = await t.http().get('/api/products?category=Books').expect(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      res.body.data.forEach((p: any) => expect(p.category).toBe('Books'));
    });

    it('filters by price range', async () => {
      const res = await t
        .http()
        .get('/api/products?minPrice=10&maxPrice=20')
        .expect(200);
      res.body.data.forEach((p: any) => {
        expect(p.price).toBeGreaterThanOrEqual(10);
        expect(p.price).toBeLessThanOrEqual(20);
      });
    });

    it('sorts by price ascending', async () => {
      const res = await t
        .http()
        .get('/api/products?sortBy=price_asc&limit=50')
        .expect(200);
      const prices = res.body.data.map((p: any) => p.price);
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });
  });

  describe('GET /api/products/:id (public single)', () => {
    it('returns a single product', async () => {
      const id = await t.firstProductId();
      const res = await t.http().get(`/api/products/${id}`).expect(200);
      expect(res.body.id ?? res.body._id).toBe(id);
      expect(res.body.name).toEqual(expect.any(String));
    });

    it('returns 404 for an unknown id', async () => {
      await t
        .http()
        .get('/api/products/64b8f0000000000000000000')
        .expect(404);
    });
  });

  describe('GET /api/products/:id/related', () => {
    it('returns related products in the same category', async () => {
      const id = await t.firstProductId();
      const res = await t.http().get(`/api/products/${id}/related`).expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeLessThanOrEqual(4);
      // Should not contain the product itself.
      res.body.forEach((p: any) => expect(p.id ?? p._id).not.toBe(id));
    });

    it('returns 404 when the source product does not exist', async () => {
      await t
        .http()
        .get('/api/products/64b8f0000000000000000000/related')
        .expect(404);
    });
  });

  describe('POST /api/products (admin only)', () => {
    it('creates a product as admin (201)', async () => {
      const res = await t
        .http()
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validProduct)
        .expect(201);

      expect(res.body.name).toBe(validProduct.name);
      expect(res.body.price).toBe(validProduct.price);
    });

    it('rejects unauthenticated requests with 401', async () => {
      await t.http().post('/api/products').send(validProduct).expect(401);
    });

    it('rejects a non-admin user with 403', async () => {
      const { token } = await t.signupUser();
      await t
        .http()
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send(validProduct)
        .expect(403);
    });

    it('rejects an invalid body with 400', async () => {
      await t
        .http()
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Missing fields', price: -5 })
        .expect(400);
    });
  });

  describe('PUT /api/products/:id (admin only)', () => {
    let productId: string;

    beforeAll(async () => {
      const res = await t
        .http()
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...validProduct, name: 'To Be Updated' });
      productId = res.body.id ?? res.body._id;
    });

    it('updates a product as admin', async () => {
      const res = await t
        .http()
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 99.99 })
        .expect(200);
      expect(res.body.price).toBe(99.99);
    });

    it('returns 404 when updating a missing product', async () => {
      await t
        .http()
        .put('/api/products/64b8f0000000000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 1 })
        .expect(404);
    });

    it('rejects a non-admin with 403', async () => {
      const { token } = await t.signupUser();
      await t
        .http()
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ price: 1 })
        .expect(403);
    });
  });

  describe('DELETE /api/products/:id (admin only)', () => {
    it('deletes a product as admin (204)', async () => {
      const created = await t
        .http()
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...validProduct, name: 'To Be Deleted' });
      const id = created.body.id ?? created.body._id;

      await t
        .http()
        .delete(`/api/products/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204);

      await t.http().get(`/api/products/${id}`).expect(404);
    });

    it('returns 404 when deleting a missing product', async () => {
      await t
        .http()
        .delete('/api/products/64b8f0000000000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('rejects a non-admin with 403', async () => {
      const { token } = await t.signupUser();
      const id = await t.firstProductId();
      await t
        .http()
        .delete(`/api/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    });
  });
});
