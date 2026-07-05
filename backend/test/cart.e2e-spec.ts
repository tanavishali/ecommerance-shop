import { TestApp } from './test-app';

describe('Cart routes (/api/cart)', () => {
  const t = new TestApp();
  let token: string;
  let productId: string;

  beforeAll(async () => {
    await t.start();
    ({ token } = await t.signupUser());
    productId = await t.firstProductId();
  });
  afterAll(() => t.stop());

  const auth = () => ({ Authorization: `Bearer ${token}` });

  it('rejects every cart route without a token (401)', async () => {
    await t.http().get('/api/cart').expect(401);
    await t.http().post('/api/cart/items').send({ productId, quantity: 1 }).expect(401);
    await t.http().delete('/api/cart').expect(401);
  });

  describe('GET /api/cart', () => {
    it('returns an empty cart for a new user', async () => {
      const res = await t.http().get('/api/cart').set(auth()).expect(200);
      expect(res.body.items).toEqual([]);
      expect(res.body.total).toBe(0);
    });
  });

  describe('POST /api/cart/items', () => {
    it('adds an item and computes the total', async () => {
      const res = await t
        .http()
        .post('/api/cart/items')
        .set(auth())
        .send({ productId, quantity: 2 })
        .expect(201);

      const item = res.body.items.find((i: any) => i.productId === productId);
      expect(item).toBeDefined();
      expect(item.quantity).toBe(2);
      expect(res.body.total).toBeCloseTo(item.price * 2, 2);
    });

    it('increments quantity when the same product is added again', async () => {
      const res = await t
        .http()
        .post('/api/cart/items')
        .set(auth())
        .send({ productId, quantity: 1 })
        .expect(201);
      const item = res.body.items.find((i: any) => i.productId === productId);
      expect(item.quantity).toBe(3);
    });

    it('rejects an invalid body with 400', async () => {
      await t
        .http()
        .post('/api/cart/items')
        .set(auth())
        .send({ productId, quantity: 0 })
        .expect(400);
    });

    it('returns 404 when the product does not exist', async () => {
      await t
        .http()
        .post('/api/cart/items')
        .set(auth())
        .send({ productId: '64b8f0000000000000000000', quantity: 1 })
        .expect(404);
    });
  });

  describe('PATCH /api/cart/items/:productId', () => {
    it('updates the quantity of an existing item', async () => {
      const res = await t
        .http()
        .patch(`/api/cart/items/${productId}`)
        .set(auth())
        .send({ quantity: 5 })
        .expect(200);
      const item = res.body.items.find((i: any) => i.productId === productId);
      expect(item.quantity).toBe(5);
    });

    it('removes the item when quantity is 0', async () => {
      const res = await t
        .http()
        .patch(`/api/cart/items/${productId}`)
        .set(auth())
        .send({ quantity: 0 })
        .expect(200);
      const item = res.body.items.find((i: any) => i.productId === productId);
      expect(item).toBeUndefined();
    });

    it('returns 404 when the item is not in the cart', async () => {
      await t
        .http()
        .patch('/api/cart/items/64b8f0000000000000000000')
        .set(auth())
        .send({ quantity: 2 })
        .expect(404);
    });

    it('rejects a negative quantity with 400', async () => {
      await t
        .http()
        .patch(`/api/cart/items/${productId}`)
        .set(auth())
        .send({ quantity: -1 })
        .expect(400);
    });
  });

  describe('DELETE /api/cart/items/:productId', () => {
    it('removes a single item', async () => {
      await t.http().post('/api/cart/items').set(auth()).send({ productId, quantity: 1 });
      const res = await t
        .http()
        .delete(`/api/cart/items/${productId}`)
        .set(auth())
        .expect(200);
      expect(res.body.items.find((i: any) => i.productId === productId)).toBeUndefined();
    });
  });

  describe('POST /api/cart/merge', () => {
    it('merges guest items into the user cart', async () => {
      const guestItem = {
        productId,
        name: 'Guest Item',
        price: 10,
        imageUrl: 'https://example.com/x.png',
        quantity: 2,
        stock: 50,
      };
      const res = await t
        .http()
        .post('/api/cart/merge')
        .set(auth())
        .send({ items: [guestItem] })
        .expect(201);
      const item = res.body.items.find((i: any) => i.productId === productId);
      expect(item).toBeDefined();
      expect(item.quantity).toBeGreaterThanOrEqual(2);
    });
  });

  describe('DELETE /api/cart', () => {
    it('clears the cart (204)', async () => {
      await t.http().post('/api/cart/items').set(auth()).send({ productId, quantity: 1 });
      await t.http().delete('/api/cart').set(auth()).expect(204);
      const res = await t.http().get('/api/cart').set(auth()).expect(200);
      expect(res.body.items).toEqual([]);
      expect(res.body.total).toBe(0);
    });
  });
});
