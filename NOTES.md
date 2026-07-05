# NOTES.md — ShopHub Build Log

---

## 1. Agentic Workflow — How I Drove the Agent

### Tool Used
**Claude Code** (Anthropic's CLI agent) — running inside the project directory with full file read/write/bash access.

### How I Scoped and Instructed It

I used a **task-by-task instruction style** — one feature at a time, described in plain English (often Urdu/English mix), with screenshots when the issue was visual. I did not write long specification documents upfront; instead I kept a `CLAUDE.md` project-context file so the agent always had the stack, folder structure, and naming conventions loaded into context.

**Example prompt sequence I actually used (in order):**

1. `"in buttons ka bhi design change karo"` *(screenshot attached)* → Agent redesigned hero CTA buttons to gradient rounded style
2. `"verify that in the admin dashboard all the data came from real apis not fake data"` → Agent audited DashboardSection, found mock data imports, replaced all with real RTK Query hooks
3. *(Shared Stripe API keys)* → Agent scaffolded full Stripe PaymentIntent flow end-to-end
4. `"zip code field remove karo"` *(screenshot of checkout)* → Agent found `hidePostalCode: true` fix
5. `"handle this for guest user also place the order"` → Agent added `POST /orders/guest` public endpoint + frontend guest flow
6. `"why guest user order not list in admin"` → Traced root cause: guest checkout was creating a local mock object only, not saving to DB
7. `"push the code"` → Agent staged, committed with meaningful message, pushed to GitHub
8. `"light mode mein linear gradient add karo aur star rating bhi"` → Agent added CSS gradient to `globals.css` and deterministic stars to `ProductCard`
9. `"multiple filters correct karo aur cash on delivery bhi add karo"` → Agent fixed MongoDB `$in` query + added COD payment option
10. `"rate this product button bna do — guest aur login dono ke liye"` → Agent built full review system: NestJS schema/service/controller + RTK Query service + UI modal

### Context Management Strategy

- Kept `CLAUDE.md` at project root with stack details, folder structure, env var names, and component conventions
- Gave the agent screenshots when the issue was visual (buttons, layout, form fields)
- When context got long, gave explicit file paths rather than saying "that file we edited earlier"
- Verified each feature in the browser before moving to next task

---

## 2. Where the Agent Helped

- **Boilerplate elimination** — NestJS modules (schema + DTO + service + controller + module registration) took seconds instead of 20+ minutes each
- **RTK Query wiring** — connecting frontend service → Redux store → component hooks correctly every time
- **Stripe integration** — complex 3-step flow (create intent → confirm card → create order) done correctly in one pass
- **Cross-cutting fixes** — when I said "guest orders not in admin", agent traced the full flow from frontend checkout → backend endpoint → admin query and identified the exact gap

---

## 3. Where the Agent Failed — Caught & Corrected

### Failure 1 — Stripe Constructor Error
**What happened:** Agent wrote `import Stripe from 'stripe'` (ESM style). Backend crashed at runtime with `stripe_1.default is not a constructor`.  
**How I caught it:** Ran the backend, saw the error in terminal.  
**Fix:** Changed to `import Stripe = require('stripe')` and `new (Stripe as any)(...)` — CommonJS interop fix.

### Failure 2 — Guest Orders Not Appearing in Admin
**What happened:** Agent initially made guest checkout create a local JavaScript object and store it in Redux — not in the database. Admin panel queries MongoDB, so guest orders were invisible.  
**How I caught it:** Placed a guest order, went to admin orders page — not there. Told agent "i place an order by guest and then admin not get that order why".  
**Fix:** Agent added `POST /orders/guest` public endpoint; frontend now calls `createGuestOrder` which hits the real DB.

### Failure 3 — Silent Error Swallowing (Admin Status Update)
**What happened:** Agent's `handleStatusChange` had an empty `catch` block — errors disappeared silently. Admin status updates appeared to fail with no feedback.  
**How I caught it:** Noticed status wasn't changing in admin. Used curl to confirm the endpoint worked — so the issue was in the frontend error handling.  
**Fix:** Added toast feedback state with green/red messages.

### Failure 4 — Multi-Category Filter Only Using First Category
**What happened:** Agent wired `categories[0]` to the API instead of all selected categories. Selecting Electronics + Sports only filtered Electronics.  
**How I caught it:** Visual test — selected multiple category chips, saw only first worked.  
**Fix:** Backend uses MongoDB `$in` with RegExp array; frontend passes `categories.join(',')`.

### Failure 5 — Stripe API Version Outdated
**What happened:** Agent used `'2025-05-28.basil'` as the Stripe API version — this was already deprecated.  
**How I caught it:** Stripe SDK threw an error on PaymentIntent creation.  
**Fix:** Updated to `'2026-06-24.dahlia'`.

### Failure 6 — `userId.slice()` Crash on Guest Orders in Admin
**What happened:** Admin OrdersSection tried to display `o.userId.slice(-6)` — crashed with `Cannot read properties of null` because guest orders have `userId: null`.  
**How I caught it:** Admin orders page threw a runtime error when guest orders existed.  
**Fix:** Added null guard: `o.userId ? 'user ' + o.userId.slice(-6) : 'guest'`

---

## 4. Supervision & Verification Method

- **Every backend change:** Tested with curl or Postman before moving on
- **Every frontend change:** Opened browser, performed the actual flow (add to cart → checkout → confirm)
- **Auth flows:** Logged in as customer, tried to hit `/admin` routes — confirmed 403
- **Guest flows:** Placed orders without login, checked admin panel for visibility
- **Screenshots:** Sent the agent visual evidence when something looked wrong
- **Git history:** Committed after each verified feature — so history reflects real incremental work

---

## 5. Design Workflow

**Tool used:** Claude Code (same agent) with design direction via text + screenshots.

**Process:**
1. Started with a dark-mode e-commerce aesthetic — deep navy/violet palette inspired by modern storefronts
2. Described component intent verbally: *"gradient rounded CTA buttons with glow shadow and animated arrow"*
3. Iterated via screenshots — sent image of current state, described what to change
4. Used Tailwind CSS utility classes throughout — no external UI kit dropped in
5. Custom components built from scratch: `Button`, `Badge`, `Card`, `Alert`, `Skeleton`, `Typography`, `Divider`, `RHFInput`
6. Light/dark mode: aurora gradient dark background + fixed linear gradient light mode — both applied via `globals.css`
7. Auth pages: initially had split left-panel layout → iterated to centered card after review

**Visual decisions:**
- Violet/indigo as primary brand colour (consistent across storefront + admin)
- Zinc scale for neutrals
- Amber for star ratings (universal convention)
- Green for success states, red for errors, amber for warnings

---

## 6. Open-Ended Requirement — "Relevant Product Suggestions"

**My interpretation:** "Relevant" means same-category products the customer hasn't already viewed in this session — a lightweight content-based recommendation.

**Why this interpretation:** A collaborative filter (users who bought X also bought Y) requires purchase history volume we don't have at this scale. Category-based suggestions are immediately useful, always available, and don't require a separate ML model.

**Implementation:**
- `GET /products?category=X&limit=8` on the product detail page fetches related products
- The current product is excluded from results in the frontend
- Displayed as "You might also like" grid below the main product
- Backend endpoint: `useGetRelatedProductsQuery({ productId, category })`

**What I'd do with more time:** Track view history in localStorage and weight suggestions toward categories the user has browsed most, combined with price-range proximity.

---

## 7. Architecture Decisions

### Stack Choice
- **NestJS** — structured, decorator-based, TypeScript-first. Scales cleanly to modules.
- **MongoDB + Mongoose** — flexible schema for product variants and nested order items
- **Next.js 14 App Router** — file-based routing, RSC-ready, natural fit for e-commerce SEO
- **RTK Query** — co-located data fetching + caching + invalidation with Redux state

### Guest Orders → DB (not localStorage)
Admin panel queries MongoDB. Guest-only localStorage orders are invisible to admin. Decision: save all orders to DB with `userId: null`. Public `POST /orders/guest` endpoint, no auth required.

### OptionalJwtGuard on Reviews
Same endpoint handles both authenticated and guest reviewers. Logged-in users get name pre-filled from JWT payload; guests provide their name manually. Avoids duplicating the review endpoint.

### Deterministic Star Ratings on Catalog Cards
Real review stats require a DB read per product card — expensive on a grid of 20. Catalog cards use a deterministic hash of `product._id` to show stable 3.5–4.9 stars. Product detail page shows real stats from `/reviews/:id/stats`.

### Stripe CommonJS Import
NestJS compiles to CommonJS. `import Stripe from 'stripe'` breaks at runtime. Use `import Stripe = require('stripe')` + `new (Stripe as any)(...)`.

### Multi-Category Filter
`?category=Electronics,Sports` comma-separated. Backend splits → MongoDB `$in` with case-insensitive RegExp. Frontend: `categories.join(',')` to API, `params.append('category', c)` per item for URL sync.

### Image Uploads
Multer to local disk (`/uploads`). Served via static asset route. Trade-off: would use S3/Cloudinary in production. Documented choice beats undocumented workaround.

---

## 8. Bugs Caught & Fixed

| Bug | Root Cause | Fix |
|-----|-----------|-----|
| `stripe_1.default is not a constructor` | ESM import in CJS context | `import Stripe = require('stripe')` |
| Stripe API version rejected | Outdated version string `'2025-05-28.basil'` | Updated to `'2026-06-24.dahlia'` |
| Guest orders missing from admin | Guest checkout only created Redux state, not DB record | Added `POST /orders/guest` public endpoint |
| Admin status update silent fail | Empty catch block swallowed all errors | Added toast feedback + curl-verified endpoint |
| `userId.slice()` crash on null | Guest orders have `userId: null` | Null guard: `o.userId ? ... : 'guest'` |
| Stripe ZIP field visible | CardElement default shows postal code | `hidePostalCode: true` on CardElement options |
| Multiple filters broken | Frontend passed `categories[0]` only | Comma-join + `$in` MongoDB query |
| `Express.Multer.File` TS error | Missing type package | Installed `@types/multer` |

---

## 9. Trade-offs & Scope

### Built Fully
- Auth (JWT, refresh, guest mode, role-based access)
- Full product catalog: search, filter (multi-category), price range, sort
- Product detail with real reviews + rating modal
- Server cart (auth users) + local cart (guests) with merge on login
- Checkout: Stripe test payments + Cash on Delivery
- Guest checkout saves to DB — visible in admin
- Admin: full product CRUD with image upload, order status lifecycle, real dashboard analytics
- Product reviews & ratings backend + UI

### Mocked / Simplified
- Star ratings on catalog cards are deterministic (not real DB averages) — detail page shows real
- No email notifications on order — would add SendGrid/Resend in production
- Image storage is local disk — would use S3 in production
- No rate limiting on API endpoints

### What I'd Do With More Time
- Proper cursor-based pagination on catalog (not just load-more)
- Wishlist feature
- Password reset via email
- Order email confirmations
- Search with debounce + Elasticsearch
- Unit + integration test suite
- Redis for cart caching
- S3 for image storage

---

## 10. Security Notes

- Passwords hashed with bcrypt (never stored plaintext)
- JWT secret in `.env` only — never in source code
- Stripe secret key in `backend/.env` only
- `password` field stripped from all API responses via Mongoose `toJSON` transform
- Admin routes protected by `JwtAuthGuard` + `RolesGuard` + `@Roles('admin')` decorator
- `POST /orders/guest` and `POST /payments/create-intent` are intentionally public — no auth needed for guest checkout
- CORS configured to whitelist known frontend origins only
