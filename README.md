# ShopHub

A full-stack e-commerce application — a **NestJS + MongoDB** REST API and a **Next.js 16 (React 19)** storefront with an admin panel.

| Layer | Stack | Dev URL |
|-------|-------|---------|
| Frontend | Next.js 16, React 19, Redux Toolkit (RTK Query), Tailwind CSS 4, Stripe.js | http://localhost:3000 |
| Backend  | NestJS 10, Mongoose, JWT (Passport), Stripe, Multer | http://localhost:3001/api |
| Database | MongoDB | mongodb://127.0.0.1:27017/ecommerce |

---

## Repository layout

```
finel-accessmant/
├── backend/      # NestJS REST API (auth, products, cart, orders, payments, reviews, upload)
│   ├── src/
│   ├── test/     # Jest e2e route tests (in-memory MongoDB)
│   └── uploads/  # Locally stored product images
├── frontend/     # Next.js storefront + admin panel
│   ├── app/              # App-router pages
│   ├── sections/         # Page-level feature sections
│   ├── custom-components/ # Reusable UI + layout
│   ├── services/         # RTK Query API slices
│   └── store/            # Redux store & slices
└── README.md
```

---

## Prerequisites

- **Node.js** 20+
- **MongoDB** running locally on `27017` (or a MongoDB Atlas connection string)

---

## Getting started

### 1. Backend

```bash
cd backend
npm install
# create .env (see below)
npm run start:dev        # watch mode → http://localhost:3001/api
```

`.env` (backend):

```env
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
ACCESS_TOKEN_SECRET=accesssecretkey
REFRESH_TOKEN_SECRET=refreshsecretkey
PORT=3001
STRIPE_SECRET_KEY=sk_test_xxx        # your Stripe test secret key
```

On first boot the API **seeds** demo data automatically:

| Account | Email | Password |
|---------|-------|----------|
| Admin    | `admin@shop.com`    | `admin123`    |
| Customer | `customer@shop.com` | `customer123` |

…plus 20 sample products.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev              # → http://localhost:3000
```

If your API is not on the default URL, set the API base in the frontend env (e.g. `.env.local`) to match your backend.

---

## API overview

All routes are prefixed with `/api`.

| Resource | Routes |
|----------|--------|
| **Auth** | `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` |
| **Products** | `GET /products`, `GET /products/:id`, `GET /products/:id/related`, `POST/PUT/DELETE /products/:id` *(admin)* |
| **Cart** | `GET /cart`, `POST /cart/items`, `PATCH /cart/items/:productId`, `DELETE /cart/items/:productId`, `DELETE /cart`, `POST /cart/merge` |
| **Orders** | `POST /orders`, `POST /orders/guest`, `GET /orders/my`, `GET /orders` *(admin)*, `GET /orders/:id`, `PATCH /orders/:id/status` *(admin)* |
| **Payments** | `POST /payments/create-intent` (Stripe) |
| **Reviews** | `POST /reviews`, `GET /reviews/:productId`, `GET /reviews/:productId/stats` |
| **Upload** | `POST /upload/image` *(admin)*, `GET /upload/files/:filename` |

Admin-only routes require a JWT belonging to a user with `role: "admin"`.

---

## Testing

The backend ships end-to-end tests for **every route**, run against an in-memory MongoDB (the real database is never touched; Stripe is mocked):

```bash
cd backend
npm test          # or: npm run test:e2e
```

---

## Notes

- The frontend background is a fixed gradient defined in `frontend/app/globals.css` — an aurora sweep in dark mode and a violet→sky→emerald→fuchsia pastel sweep in light mode.
- Product images uploaded by an admin are stored under `backend/uploads/` and served from `/api/upload/files/:filename`.
