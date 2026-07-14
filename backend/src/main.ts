import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/** Apply all app-wide config — shared by local server and serverless handler. */
function configure(app: INestApplication) {
  app.setGlobalPrefix('api');

  // Vercel gives every branch/PR/production deploy its own subdomain (shophub-<hash>.vercel.app),
  // so a fixed allowlist alone would break previews — allow any subdomain under this project too.
  const VERCEL_PREVIEW_ORIGIN = /^https:\/\/shophub-[a-z0-9-]+\.vercel\.app$/;
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173', // Techriwaayat marketing site (Vite dev server)
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || VERCEL_PREVIEW_ORIGIN.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false, transform: true }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ShopHub API')
    .setDescription('E-commerce storefront + admin API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));
}

// ── Serverless (Vercel) ──────────────────────────────────────────────────────
// Bootstraps once and caches the underlying Express instance across invocations.
let cachedServer: any = null;
export async function bootstrapServerless() {
  if (cachedServer) return cachedServer;
  const app = await NestFactory.create(AppModule);
  configure(app);
  await app.init();
  cachedServer = app.getHttpAdapter().getInstance();
  return cachedServer;
}

// ── Local / traditional server ───────────────────────────────────────────────
async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);
  configure(app);
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 ShopHub API running on http://localhost:${port}/api`);
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}

// On Vercel the function handler drives the app, so we must NOT call listen().
if (!process.env.VERCEL) {
  bootstrapLocal();
}
