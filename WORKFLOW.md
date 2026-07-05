# WORKFLOW.md — ShopHub Actual Build Journey

This file documents the **real sequence of how this project was built** — phase by phase, prompt by prompt, using Claude Code as the agentic tool. Each phase shows the instruction given, what the agent did, and how it was verified.

---

## Phase 0 — Project Setup & Scaffolding

**Goal:** Get a working "hello world" on both backend and frontend before writing any real features.

**Instructions given to agent:**
```
Scaffold a NestJS backend at backend/ and a Next.js 14 App Router frontend at frontend/.
Backend port: 3001. Frontend port: 3000.
MongoDB connection via MONGO_URI env var.
Set global prefix /api on backend.
```

**What agent did:**
- Created NestJS project with `@nestjs/cli`
- Set up `ConfigModule.forRoot({ isGlobal: true })` so env vars work everywhere
- Created Next.js project with App Router, Tailwind CSS, TypeScript
- Set up `baseApi.ts` with RTK Query and Redux store with `redux-persist`

**Verified by:** Running both servers, hitting `GET /api` from browser

---

## Phase 1 — Database Models & Seed Script

**Goal:** Define all schemas upfront so nothing has to be retrofitted later.

**Instructions given:**
```
Create Mongoose schemas for: User, Product, Order, Cart.
User: name, email, password (bcrypt), role (user/admin).
Product: name, description, price, originalPrice, category, imageUrl, stock.
Order: userId (optional for guests), items[], shippingAddress, status, paymentStatus, total.
Cart: userId, items[].
Also create a seed script that inserts sample products, one admin user, one customer.
```

**What agent did:**
- Built all schemas with proper TypeScript types
- Password hashed with bcrypt in `users.service.ts` before saving
- `toJSON` transform strips `password` and `__v` from all responses
- Seed script populates 20+ products across 5 categories

**Verified by:** Ran seed script, checked MongoDB Compass — data present

---

## Phase 2 — Authentication

**Goal:** JWT-based auth with role support before building any protected features.

**Instructions given:**
```
Implement JWT auth in NestJS.
POST /auth/signup — create user, return tokens
POST /auth/login — validate, return tokens
Use passport-jwt strategy.
Create JwtAuthGuard, RolesGuard, @Roles decorator, @CurrentUser decorator.
Also create OptionalJwtGuard for endpoints that work for both guests and logged-in users.
Frontend: RTK Query authService, Redux authSlice with setCredentials, token persisted in redux-persist.
```

**Verified by:**
- Signed up as new user → got tokens
- Tried hitting `GET /orders/my` without token → got 401
- Tried hitting `GET /admin/orders` as regular user → got 403

---

## Phase 3 — Product Catalog & Filtering

**Goal:** Browsable storefront with search, filter, sort, and category.

**Instructions given:**
```
Build GET /products with query params: search, category, minPrice, maxPrice, sort, page, limit.
Frontend: CatalogSection with category chip filters, price range slider, sort dropdown.
Filters must be URL-driven (searchParams) so sharing a URL preserves the filter state.
```

**Agent mistake caught:** Multi-category filter only used `categories[0]` — the rest were ignored.

**Fix applied:**
- Backend: `category.split(',')` → MongoDB `$in` with RegExp array
- Frontend: `categories.join(',')` to API; `params.append('category', c)` per item

**Verified by:** Selected Electronics + Sports in UI, confirmed both categories appeared in results

---

## Phase 4 — Product Detail Page

**Goal:** Full product info, add to cart, related products.

**Instructions given:**
```
Build ProductDetailSection.tsx.
Show: image, name, category badge, price (with strikethrough original), stock status, description.
Add to cart with quantity selector (max = stock, max 10).
Show related products (same category) at bottom.
```

**What agent did:** Built full section with skeleton loading, out-of-stock overlay, low-stock alert, share button.

**Verified by:** Opened product page, added to cart, checked cart drawer updated

---

## Phase 5 — Shopping Cart

**Goal:** Cart that persists across sessions for logged-in users; local cart for guests.

**Instructions given:**
```
Server cart: POST /cart/add, PATCH /cart/item/:id, DELETE /cart/item/:id, GET /cart/my — all behind JwtAuthGuard.
Guest cart: Redux local state (redux-persist).
On login: merge local items into server cart then clear local.
Cart drawer shows line totals and order total.
```

**Verified by:** Added items as guest → logged in → confirmed items appeared in server cart

---

## Phase 6 — Checkout & Stripe

**Goal:** Real Stripe test payment + Cash on Delivery option.

**Instructions given (with API keys shared):**
```
Integrate Stripe. Backend: POST /payments/create-intent (public — guests must pay too).
Frontend: Stripe Elements with CardElement. hidePostalCode: true.
Flow: create intent → confirmCardPayment → createOrder.
Also add Cash on Delivery option that skips Stripe.
```

**Agent mistake caught 1:** `stripe_1.default is not a constructor` — ESM/CJS interop issue.  
**Fix:** `import Stripe = require('stripe')` + `new (Stripe as any)(...)`

**Agent mistake caught 2:** Stripe API version `'2025-05-28.basil'` rejected.  
**Fix:** Updated to `'2026-06-24.dahlia'`

**Agent mistake caught 3:** ZIP/postal code field showing on card form.  
**Fix:** `hidePostalCode: true` on CardElement options

**Verified by:** Entered Stripe test card `4242 4242 4242 4242` → order placed → confirmation shown

---

## Phase 7 — Guest Orders Saved to DB

**Goal:** Guest checkout orders must appear in admin panel.

**Problem discovered:** Guest checkout was creating a local JavaScript object in Redux — not saving to MongoDB. Admin panel queries MongoDB → guest orders invisible.

**Instructions given:**
```
Add POST /orders/guest public endpoint (no JwtAuthGuard).
Order schema: userId optional (default: null).
Frontend guest checkout must call createGuestOrder mutation after Stripe payment.
```

**Verified by:** Placed order as guest → went to admin orders → order appeared with "guest" label

---

## Phase 8 — Admin Panel

**Goal:** Product management, order management, dashboard with real data.

**Instructions given:**
```
Admin dashboard: real API data only — no mock data.
Compute: salesByDay (last 7 days), ordersByStatus, topProducts by revenue, uniqueCustomers.
Product management: full CRUD with image upload (Multer to local /uploads).
Orders: view all, update status through lifecycle pending→processing→shipped→delivered→cancelled.
All admin endpoints: @UseGuards(JwtAuthGuard, RolesGuard) + @Roles('admin').
```

**Agent mistake caught:** `handleStatusChange` had empty catch block — status updates silently failed.  
**How caught:** Tried updating order status in admin → nothing changed, no error shown.  
**Fix:** Added toast feedback state (green/red) + confirmed endpoint works via curl.

**Agent mistake caught:** Admin orders page crashed with `Cannot read properties of null (reading 'slice')`.  
**Cause:** `o.userId.slice(-6)` when guest orders have `userId: null`.  
**Fix:** `o.userId ? 'user ' + o.userId.slice(-6) : 'guest'`

**Verified by:** curl `PATCH /orders/:id/status` with admin JWT → 200 OK → toast confirmed in UI

---

## Phase 9 — Product Reviews & Ratings

**Goal:** Any user (guest or logged-in) can rate and review products.

**Instructions given:**
```
Backend: ReviewsModule with schema (productId, rating 1-5, comment, userName, userId nullable).
POST /reviews — OptionalJwtGuard (guest + auth both).
GET /reviews/:productId — all reviews.
GET /reviews/:productId/stats — { average, count, breakdown: {1-5: count} }.
Frontend: rating modal with interactive star picker, name input, comment textarea.
ProductDetailSection: show live stats, "Rate this product" button, reviews list with breakdown bar.
```

**Verified by:** Submitted review as guest → stats updated → breakdown bar reflected new rating

---

## Phase 10 — UI Polish & Bug Fixes

**Goal:** Visual consistency, light mode gradient, star ratings on catalog cards, auth page layout.

**Instructions given (via screenshots):**
- `"in buttons ka bhi design change karo"` → gradient rounded CTA buttons
- `"light mode mein linear gradient add karo"` → fixed attachment gradient in globals.css
- `"star rating add karo har item pe"` → deterministic ratings from `_id` on ProductCard
- `"left box remove karo login page pe, right box center karo border do"` → auth pages redesigned

**Verified by:** Visual inspection in browser, both light and dark mode

---

## Phase 11 — Final Push & Deployment Prep

**Instructions given:**
```
Push all uncommitted code to GitHub.
Update main.ts CORS to accept FRONTEND_URL env var for production.
```

**Verified by:** `git log --oneline` shows clean incremental history — no single "dump" commit

---

## Reusable Prompt Patterns (What Worked Best)

### For backend features:
```
Add [X] module to NestJS at backend/src/[x]/.
Schema fields: [list].
Routes needed: [GET/POST/PATCH with auth rules].
Register in app.module.ts.
```

### For frontend sections:
```
Build [X]Section.tsx.
Data from: [RTK Query hooks].
Loading state: skeleton. Error state: alert. Empty state: message.
Use existing custom-components (Button, Badge, Card, etc). Tailwind only.
```

### For bug fixes (with screenshot):
```
[screenshot attached]
[describe what's wrong visually or what error you see]
```
This was most effective — the agent could see exactly what was wrong.

---

## What I Would Do Differently

1. **Write tests as I go** — not at the end. Each service method should have a `.spec.ts` alongside it.
2. **Set up pagination earlier** — the marquee slider works but proper page-based pagination was in the spec.
3. **Rate limiting from day one** — `@nestjs/throttler` on all public endpoints.
4. **Keep uploads out of git** — `backend/uploads/` should be in `.gitignore`.
