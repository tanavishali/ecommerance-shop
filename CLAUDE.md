# CLAUDE.md — ShopHub Project Brain

## What this is

**ShopHub** — full-stack e-commerce monorepo.

| App | Tech | Port |
|-----|------|------|
| `backend/` | NestJS 10, Mongoose, Passport-JWT, Stripe, Multer | 3001 |
| `frontend/` | Next.js 14+ App Router, RTK Query, Tailwind CSS 4, Stripe.js | 3000 |

No root `package.json` — all commands run inside each app folder.

---

## Commands

### Backend (`cd backend`)
```bash
npm run start:dev       # watch-mode dev server → http://localhost:3001/api
npm run build           # compile TypeScript
npm start               # run compiled output
```

### Frontend (`cd frontend`)
```bash
npm run dev             # dev server → http://localhost:3000
npm run build           # production build
npm run lint            # ESLint check
```

---

## Folder Structure

```
finel-accessmant/
├── backend/
│   └── src/
│       ├── auth/           # JWT login, signup, refresh, guards
│       ├── users/          # User schema + CRUD
│       ├── products/       # Products CRUD + seeding
│       ├── cart/           # Per-user server cart
│       ├── orders/         # Order creation (auth + guest), status update
│       ├── payments/       # Stripe PaymentIntent creation
│       ├── reviews/        # Product ratings & reviews
│       ├── upload/         # Multer image uploads
│       └── seed/           # DB seeder (products + users)
└── frontend/
    ├── app/                # Next.js App Router pages
    │   ├── (storefront)/   # Public shop pages
    │   └── (admin)/        # Admin panel pages
    ├── sections/
    │   ├── storefront/     # HomeSection, CatalogSection, ProductDetailSection, CheckoutSection …
    │   └── admin/          # DashboardSection, OrdersSection, ProductsSection …
    ├── custom-components/
    │   ├── ui/             # Button, Badge, Card, Alert, Typography, Divider, Skeleton …
    │   └── product/        # ProductCard, ProductGrid
    ├── services/           # RTK Query slices (authService, productsService, ordersService, reviewsService …)
    ├── store/              # Redux store + slices (authSlice, cartSlice)
    └── app/globals.css     # Global gradient background
```

---

## Auth

- **JWT** stateless — `Authorization: Bearer <token>` header
- `ACCESS_TOKEN_SECRET=accesssecretkey`
- `REFRESH_TOKEN_SECRET=refreshsecretkey`
- Admin-only routes: `JwtAuthGuard` + `RolesGuard` + `@Roles('admin')`
- Guest-accessible routes: `OptionalJwtGuard` (allows both)
- Seeded accounts: `admin@shop.com / admin123` · `customer@shop.com / customer123`

---

## Database

- **Local:** `mongodb://127.0.0.1:27017/ecommerce`
- **Atlas:** `mongodb+srv://tanawish:...@cluster0.eno7z4q.mongodb.net/authDB`
- Set via `MONGO_URI` in `backend/.env`

---

## Stripe

- `STRIPE_SECRET_KEY` in `backend/.env`
- API version: `2026-06-24.dahlia`
- CommonJS import pattern (required for NestJS):
  ```typescript
  import Stripe = require('stripe');
  this.stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-06-24.dahlia' });
  ```
- Flow: `POST /payments/create-intent` → `stripe.confirmCardPayment()` (frontend) → `POST /orders`

---

## Key Conventions

### Backend
- Every DTO property needs a `class-validator` decorator — global `ValidationPipe({ whitelist: true })` strips undeclared fields silently
- `userId` is optional (`default: null`) on Order schema — supports guest orders
- Guest orders: `POST /orders/guest` (public, no guard)
- `paymentStatus`: `'paid'` if `paymentIntentId` present, else `'pending'`

### Frontend
- **RTK Query** slices in `services/` — always use `providesTags` / `invalidatesTags`
- **Redux persist** — `authSlice` and `cartSlice` are persisted
- Guest cart = `localItems` in `cartSlice`; merges to server on login
- Catalog URL params: `?category=…&q=…&sortBy=…&page=…` — `CatalogSection` is URL-driven
- Multi-category filter: comma-separated `?category=A,B` → backend uses MongoDB `$in`
- Star ratings on ProductCard: deterministic from `_id` char-code sum (3.5–4.9 range) — cosmetic only
- Real ratings come from `reviewsService` → `GET /reviews/:id/stats`

### Theming
- Light mode: pastel linear gradient in `globals.css` (`body { background: linear-gradient(...) }`)
- Dark mode: aurora + starfield via `.dark body`
- All page sections have transparent backgrounds so the global gradient shows through
- Hover border convention: "remove border on hover" = `1px solid transparent` (not keep resting color)

---

## Environment Files

`backend/.env` (gitignored — never commit):
```
MONGO_URI=...
ACCESS_TOKEN_SECRET=accesssecretkey
REFRESH_TOKEN_SECRET=refreshsecretkey
STRIPE_SECRET_KEY=sk_test_...
```

---

## Features Built

| Feature | Status |
|---------|--------|
| Auth (login / signup / JWT refresh) | ✅ |
| Product catalog with multi-category filter | ✅ |
| Product detail page | ✅ |
| Server cart (auth users) + local cart (guests) | ✅ |
| Checkout — Stripe card payment | ✅ |
| Checkout — Cash on Delivery | ✅ |
| Guest checkout (saves order to DB) | ✅ |
| Admin dashboard (real API data) | ✅ |
| Admin order status update with toast | ✅ |
| Image upload (Multer) | ✅ |
| Star ratings on product cards (deterministic) | ✅ |
| Product reviews & ratings (real DB) | ✅ |
| Light mode gradient background | ✅ |
| Login / Signup — centered card layout | ✅ |
