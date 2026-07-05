import { TestApp } from './test-app';

describe('Payments routes (/api/payments)', () => {
  const t = new TestApp();

  beforeAll(() => t.start());
  afterAll(() => t.stop());

  describe('POST /api/payments/create-intent', () => {
    it('returns a clientSecret for a valid amount (200)', async () => {
      const res = await t
        .http()
        .post('/api/payments/create-intent')
        .send({ amount: 109.99, currency: 'gbp' })
        .expect(200);

      expect(res.body.clientSecret).toEqual(expect.any(String));
      expect(t.paymentsMock.createPaymentIntent).toHaveBeenCalledWith(109.99, 'gbp');
    });

    it('defaults the currency when omitted', async () => {
      await t
        .http()
        .post('/api/payments/create-intent')
        .send({ amount: 25 })
        .expect(200);
      expect(t.paymentsMock.createPaymentIntent).toHaveBeenCalledWith(25, undefined);
    });

    it('rejects an amount below the minimum (0.5) with 400', async () => {
      await t
        .http()
        .post('/api/payments/create-intent')
        .send({ amount: 0.1 })
        .expect(400);
    });

    it('rejects a non-numeric amount with 400', async () => {
      await t
        .http()
        .post('/api/payments/create-intent')
        .send({ amount: 'free' })
        .expect(400);
    });

    it('rejects a missing amount with 400', async () => {
      await t.http().post('/api/payments/create-intent').send({}).expect(400);
    });
  });
});
