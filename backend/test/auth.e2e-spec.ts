import { TestApp } from './test-app';

describe('Auth routes (/api/auth)', () => {
  const t = new TestApp();

  beforeAll(() => t.start());
  afterAll(() => t.stop());

  describe('POST /api/auth/signup', () => {
    it('registers a new user and returns a JWT + sanitised user', async () => {
      const res = await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'Alice', email: 'alice@test.com', password: 'secret123' })
        .expect(201);

      expect(res.body.token).toEqual(expect.any(String));
      expect(res.body.user).toMatchObject({
        name: 'Alice',
        email: 'alice@test.com',
        role: 'user',
      });
      // Password must never leak in the response.
      expect(res.body.user.password).toBeUndefined();
    });

    it('rejects a duplicate email with 409', async () => {
      await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'Bob', email: 'dup@test.com', password: 'secret123' })
        .expect(201);

      await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'Bob 2', email: 'dup@test.com', password: 'secret123' })
        .expect(409);
    });

    it('rejects an invalid email with 400', async () => {
      await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'Bad', email: 'not-an-email', password: 'secret123' })
        .expect(400);
    });

    it('rejects a too-short password with 400', async () => {
      await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'Bad', email: 'short@test.com', password: '123' })
        .expect(400);
    });

    it('rejects a too-short name with 400', async () => {
      await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'A', email: 'shortname@test.com', password: 'secret123' })
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      await t
        .http()
        .post('/api/auth/signup')
        .send({ name: 'Login User', email: 'login@test.com', password: 'secret123' });
    });

    it('logs in with correct credentials (200)', async () => {
      const res = await t
        .http()
        .post('/api/auth/login')
        .send({ email: 'login@test.com', password: 'secret123' })
        .expect(200);

      expect(res.body.token).toEqual(expect.any(String));
      expect(res.body.user.email).toBe('login@test.com');
    });

    it('rejects a wrong password with 401', async () => {
      await t
        .http()
        .post('/api/auth/login')
        .send({ email: 'login@test.com', password: 'wrongpass' })
        .expect(401);
    });

    it('rejects an unknown email with 401', async () => {
      await t
        .http()
        .post('/api/auth/login')
        .send({ email: 'nobody@test.com', password: 'secret123' })
        .expect(401);
    });

    it('rejects a malformed body with 400', async () => {
      await t.http().post('/api/auth/login').send({ email: 'x' }).expect(400);
    });
  });

  describe('GET /api/auth/me', () => {
    it('returns the current user when authenticated', async () => {
      const { token, user } = await t.signupUser({ name: 'Me User' });

      const res = await t
        .http()
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.email).toBe(user.email);
      expect(res.body.password).toBeUndefined();
    });

    it('rejects a request without a token with 401', async () => {
      await t.http().get('/api/auth/me').expect(401);
    });

    it('rejects an invalid token with 401', async () => {
      await t
        .http()
        .get('/api/auth/me')
        .set('Authorization', 'Bearer not.a.real.token')
        .expect(401);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('returns a success message when authenticated', async () => {
      const { token } = await t.signupUser();

      const res = await t
        .http()
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toBe('Logged out successfully');
    });

    it('rejects logout without a token with 401', async () => {
      await t.http().post('/api/auth/logout').expect(401);
    });
  });
});
