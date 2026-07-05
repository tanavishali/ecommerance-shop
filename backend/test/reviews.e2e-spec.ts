import { TestApp } from './test-app';

describe('Reviews routes (/api/reviews)', () => {
  const t = new TestApp();
  let productId: string;
  let token: string;

  beforeAll(async () => {
    await t.start();
    productId = await t.firstProductId();
    ({ token } = await t.signupUser({ name: 'Reviewer Rick' }));
  });
  afterAll(() => t.stop());

  describe('POST /api/reviews', () => {
    it('creates a review as a guest (uses the supplied userName)', async () => {
      const res = await t
        .http()
        .post('/api/reviews')
        .send({ productId, rating: 4, comment: 'Pretty good', userName: 'Guest Greg' })
        .expect(201);

      expect(res.body.rating).toBe(4);
      expect(res.body.userName).toBe('Guest Greg');
      expect(res.body.userId).toBeNull();
    });

    it('uses the authenticated user name when logged in', async () => {
      const res = await t
        .http()
        .post('/api/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId, rating: 5, comment: 'Excellent', userName: 'ignored' })
        .expect(201);

      expect(res.body.userName).toBe('Reviewer Rick');
      expect(res.body.userId).toEqual(expect.any(String));
    });

    it('rejects a rating above 5 with 400', async () => {
      await t
        .http()
        .post('/api/reviews')
        .send({ productId, rating: 6, userName: 'Bad' })
        .expect(400);
    });

    it('rejects a rating below 1 with 400', async () => {
      await t
        .http()
        .post('/api/reviews')
        .send({ productId, rating: 0, userName: 'Bad' })
        .expect(400);
    });

    it('rejects a missing userName (guest) with 400', async () => {
      await t
        .http()
        .post('/api/reviews')
        .send({ productId, rating: 3 })
        .expect(400);
    });

    it('rejects an over-long comment with 400', async () => {
      await t
        .http()
        .post('/api/reviews')
        .send({ productId, rating: 3, userName: 'X', comment: 'a'.repeat(501) })
        .expect(400);
    });
  });

  describe('GET /api/reviews/:productId', () => {
    it('returns reviews for a product, newest first', async () => {
      const res = await t.http().get(`/api/reviews/${productId}`).expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
      res.body.forEach((r: any) => expect(r.productId).toBe(productId));
    });

    it('returns an empty array for a product with no reviews', async () => {
      const res = await t
        .http()
        .get('/api/reviews/64b8f0000000000000000000')
        .expect(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /api/reviews/:productId/stats', () => {
    it('returns aggregate rating stats', async () => {
      const res = await t
        .http()
        .get(`/api/reviews/${productId}/stats`)
        .expect(200);

      expect(res.body.count).toBeGreaterThanOrEqual(2);
      expect(res.body.average).toBeGreaterThan(0);
      expect(res.body.breakdown).toEqual(
        expect.objectContaining({ '1': expect.any(Number), '5': expect.any(Number) }),
      );
    });

    it('returns zeroed stats for a product with no reviews', async () => {
      const res = await t
        .http()
        .get('/api/reviews/64b8f0000000000000000000/stats')
        .expect(200);
      expect(res.body).toEqual({
        average: 0,
        count: 0,
        breakdown: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      });
    });
  });
});
