# AGENTS.md — Backend (NestJS API)

Rules for AI agents working in `backend/`. See the root [AGENTS.md](../AGENTS.md) for monorepo-wide rules.

## Stack

NestJS 10 · Mongoose/MongoDB · Passport-JWT · Stripe · Multer · `class-validator`/`class-transformer`. All HTTP routes are served under the global `/api` prefix on port **3001**.

## Commands

```bash
cd backend
npm install
npm run start:dev      # watch-mode dev server → http://localhost:3001/api
npm run build          # nest build
npm start              # run dist/main
npm test               # Jest e2e route tests (alias: npm run test:e2e)
```

Tests run against an **in-memory MongoDB** (`mongodb-memory-server`); the real DB is never touched and Stripe is mocked. Tests live in `backend/test/*.e2e-spec.ts`.

## Module layout

Every feature is a NestJS module under `src/<feature>/`:

```
src/<feature>/
├── <feature>.module.ts
├── <feature>.controller.ts   # routes
├── <feature>.service.ts      # business logic
├── dto/                      # request DTOs (class-validator)
└── schemas/                  # Mongoose schemas (if it persists data)
```

Features: `auth`, `users`, `products`, `cart`, `orders`, `payments`, `reviews`, `upload`, `seed`. The app is wired together in `src/app.module.ts`; global pipes/CORS/prefix are set in `src/main.ts`.

## Conventions — follow these exactly

- **DTOs and validation.** A global `ValidationPipe({ whitelist: true, transform: true })` runs in `main.ts`. Every DTO property **must** carry a `class-validator` decorator (`@IsString()`, `@IsNumber()`, nested `@ValidateNested()` + `@Type()`), or it is silently stripped from the body. This is the #1 source of "the field is undefined" bugs here.
- **Auth & roles.** Protect routes with `@UseGuards(JwtAuthGuard)`. Admin-only routes add `RolesGuard` + `@Roles('admin')`. Get the caller via the `@CurrentUser()` decorator. JWT secret comes from `ACCESS_TOKEN_SECRET`.
- **Errors.** Throw Nest HTTP exceptions (`NotFoundException`, `ForbiddenException`, `ConflictException`, `UnauthorizedException`) — don't return ad-hoc error objects.
- **Schemas.** Use `@Schema({ timestamps: true })` and a `toJSON` transform that strips `__v` (and `password` on the user). Follow the existing schema files for shape.
- **Money.** Prices are numbers; totals are rounded with `Math.round(x * 100) / 100`. Stripe amounts are converted to the smallest currency unit (`* 100`) in `PaymentsService`.

## When you add or change a route

1. Update the controller + service + DTO.
2. Add/adjust the matching test in `backend/test/<feature>.e2e-spec.ts` covering: happy path, auth (401), role (403) where relevant, validation (400), and not-found (404).
3. Run `npm test` and report results.
4. If the response shape changed, flag it so the frontend RTK Query slice (`frontend/services/`) can be updated.

## Environment (`backend/.env`, gitignored — never commit)

```env
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
PORT=3001
STRIPE_SECRET_KEY=sk_test_...
```

On first boot `SeedService` creates `admin@shop.com / admin123`, `customer@shop.com / customer123`, and 20 products.
