import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

import { PaymentsService } from '../src/payments/payments.service';
import { User, UserDocument } from '../src/users/schemas/user.schema';

/**
 * Spins up the full Nest application backed by an in-memory MongoDB instance.
 *
 * The real database is never touched. Stripe is mocked so no network calls are
 * made. The app's own SeedService runs on bootstrap, so every fresh instance
 * already contains the seeded admin (admin@shop.com / admin123), a demo
 * customer (customer@shop.com / customer123) and 20 products.
 */
export class TestApp {
  app!: INestApplication;
  moduleRef!: TestingModule;
  private mongod!: MongoMemoryServer;

  /** Mock used in place of the real Stripe-backed PaymentsService. */
  paymentsMock = {
    createPaymentIntent: jest.fn(
      async (amount: number, currency = 'gbp') => ({
        clientSecret: `pi_test_secret_${amount}_${currency}`,
      }),
    ),
  };

  async start(): Promise<void> {
    this.mongod = await MongoMemoryServer.create();
    // The AppModule reads MONGO_URI at import time, so set it before importing.
    process.env.MONGO_URI = this.mongod.getUri();
    process.env.ACCESS_TOKEN_SECRET = 'accesssecretkey';
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';

    // Imported dynamically so the env vars above are in place first.
    const { AppModule } = await import('../src/app.module');

    this.moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PaymentsService)
      .useValue(this.paymentsMock)
      .compile();

    this.app = this.moduleRef.createNestApplication();
    // Mirror the production bootstrap (src/main.ts) so tests hit the same setup.
    this.app.setGlobalPrefix('api');
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
    );
    await this.app.init();
  }

  async stop(): Promise<void> {
    await this.app?.close();
    await this.mongod?.stop();
  }

  /** Raw supertest agent against the running HTTP server. */
  http() {
    return request(this.app.getHttpServer());
  }

  get userModel(): Model<UserDocument> {
    return this.moduleRef.get<Model<UserDocument>>(getModelToken(User.name));
  }

  /**
   * Registers a brand-new customer and returns its JWT + the created user.
   * Email is made unique per call to avoid cross-test collisions.
   */
  async signupUser(
    overrides: Partial<{ name: string; email: string; password: string }> = {},
  ): Promise<{ token: string; user: any }> {
    const email =
      overrides.email ?? `user_${Math.random().toString(36).slice(2)}@test.com`;
    const body = {
      name: overrides.name ?? 'Test User',
      email,
      password: overrides.password ?? 'password123',
    };
    const res = await this.http().post('/api/auth/signup').send(body);
    return { token: res.body.token, user: res.body.user };
  }

  /** Logs in the seeded admin and returns its JWT. */
  async adminToken(): Promise<string> {
    const res = await this.http()
      .post('/api/auth/login')
      .send({ email: 'admin@shop.com', password: 'admin123' });
    return res.body.token;
  }

  /** Convenience: id of the first seeded product. */
  async firstProductId(): Promise<string> {
    const res = await this.http().get('/api/products');
    return res.body.data[0].id ?? res.body.data[0]._id;
  }
}
