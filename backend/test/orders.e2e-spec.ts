import { TestApp } from './test-app';

describe('Orders routes (/api/orders)', () => {
  const t = new TestApp();
  let userToken: string;
  let adminToken: string;
  let productId: string;

  beforeAll(async () => {
    await t.start();
    ({ token: userToken } = await t.signupUser());
    adminToken = await t.adminToken();
    productId = await t.firstProductId();
  });
  afterAll(() => t.stop());

  const shippingAddress = {
    fullName: 'Test Buyer',
    address: '1 Test Street',
    city: 'Testville',
    postcode: 'TE1 1ST',
    country: 'UK',
  };

  const orderBody = () => ({
    items: [{ productId, quantity: 2 }],
    shippingAddress,
  });

  describe('POST /api/orders/guest', () => {
    it('creates a guest order without auth', async () => {
      const res = await t
        .http()
        .post('/api/orders/guest')
        .send({ ...orderBody(), paymentIntentId: 'pi_test_123' })
        .expect(201);

      expect(res.body.userId).toBeNull();
      expect(res.body.items).toHaveLength(1);
      expect(res.body.status).toBe('pending');
      expect(res.body.paymentStatus).toBe('paid');
      expect(res.body.total).toBeGreaterThan(0);
    });

    it('defaults paymentStatus to pending without a paymentIntentId', async () => {
      const res = await t
        .http()
        .post('/api/orders/guest')
        .send(orderBody())
        .expect(201);
      expect(res.body.paymentStatus).toBe('pending');
    });

    it('rejects an empty items array with 400', async () => {
      await t
        .http()
        .post('/api/orders/guest')
        .send({ items: [], shippingAddress })
        .expect(400);
    });

    it('rejects a missing shipping address with 400', async () => {
      await t
        .http()
        .post('/api/orders/guest')
        .send({ items: [{ productId, quantity: 1 }] })
        .expect(400);
    });

    it('returns 404 when a product in the order does not exist', async () => {
      await t
        .http()
        .post('/api/orders/guest')
        .send({
          items: [{ productId: '64b8f0000000000000000000', quantity: 1 }],
          shippingAddress,
        })
        .expect(404);
    });
  });

  describe('POST /api/orders (user)', () => {
    it('creates an order for the authenticated user', async () => {
      const res = await t
        .http()
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send(orderBody())
        .expect(201);
      expect(res.body.userId).toEqual(expect.any(String));
      expect(res.body.items).toHaveLength(1);
    });

    it('rejects an unauthenticated request with 401', async () => {
      await t.http().post('/api/orders').send(orderBody()).expect(401);
    });
  });

  describe('GET /api/orders/my (user)', () => {
    it("returns only the user's own orders", async () => {
      const { token } = await t.signupUser();
      await t
        .http()
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send(orderBody());

      const res = await t
        .http()
        .get('/api/orders/my')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
    });

    it('rejects an unauthenticated request with 401', async () => {
      await t.http().get('/api/orders/my').expect(401);
    });
  });

  describe('GET /api/orders (admin)', () => {
    it('returns all orders for an admin', async () => {
      const res = await t
        .http()
        .get('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('rejects a non-admin user with 403', async () => {
      await t
        .http()
        .get('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });
  });

  describe('GET /api/orders/:id', () => {
    let orderId: string;
    let ownerToken: string;

    beforeAll(async () => {
      const signup = await t.signupUser();
      ownerToken = signup.token;
      const res = await t
        .http()
        .post('/api/orders')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send(orderBody());
      orderId = res.body.id ?? res.body._id;
    });

    it('lets the owner fetch their order', async () => {
      const res = await t
        .http()
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);
      expect(res.body.id ?? res.body._id).toBe(orderId);
    });

    it('lets an admin fetch any order', async () => {
      await t
        .http()
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });

    it("forbids another user from fetching someone else's order (403)", async () => {
      const { token: otherToken } = await t.signupUser();
      await t
        .http()
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403);
    });

    it('returns 404 for an unknown order id', async () => {
      await t
        .http()
        .get('/api/orders/64b8f0000000000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/orders/:id/status (admin)', () => {
    let orderId: string;

    beforeAll(async () => {
      const res = await t
        .http()
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send(orderBody());
      orderId = res.body.id ?? res.body._id;
    });

    it('updates the status as admin', async () => {
      const res = await t
        .http()
        .patch(`/api/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' })
        .expect(200);
      expect(res.body.status).toBe('shipped');
    });

    it('rejects a non-admin user with 403', async () => {
      await t
        .http()
        .patch(`/api/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'delivered' })
        .expect(403);
    });

    it('returns 404 for an unknown order id', async () => {
      await t
        .http()
        .patch('/api/orders/64b8f0000000000000000000/status')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'shipped' })
        .expect(404);
    });
  });
});
