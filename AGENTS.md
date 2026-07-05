# AGENTS.md

Instructions for AI coding agents working in the **ShopHub** monorepo. Human-oriented docs live in [README.md](README.md); Claude Code also reads [CLAUDE.md](CLAUDE.md).

## Project shape

Two independent apps, no root `package.json`. Always `cd` into the app you're changing.

| Path | App | Port | Stack |
|------|-----|------|-------|
| `backend/`  | NestJS REST API | 3001 (`/api`) | NestJS 10, Mongoose, Passport-JWT, Stripe, Multer |
| `frontend/` | Next.js storefront + admin | 3000 | Next.js 16, React 19, Redux Toolkit (RTK Query), Tailwind 4 |

Each app has its own `AGENTS.md` with rules specific to it — read it before working there:
- [backend/AGENTS.md](backend/AGENTS.md)
- [frontend/AGENTS.md](frontend/AGENTS.md)

## Golden rules

1. **Scope your work.** Don't make cross-app changes unless the task requires it. A frontend task rarely needs backend edits and vice-versa.
2. **Match the surrounding style.** Mirror the existing file's naming, formatting, and patterns instead of importing your own conventions.
3. **Verify before claiming done.** Run the relevant check (`npm test` for backend route changes, `npm run lint` / `npx tsc --noEmit` for frontend) and report real results.
4. **Never commit secrets.** `backend/.env` holds JWT + Stripe keys and is gitignored. Don't echo secrets into code, docs, or logs.
5. **Keep the API contract in sync.** If you change a backend route's shape, update the matching RTK Query slice in `frontend/services/` and the e2e test in `backend/test/`.

## Standard workflow for a change

1. **Locate** — find the feature module (backend) or section/component (frontend); read it and its neighbours first.
2. **Plan** — for multi-file changes, outline the edits before writing.
3. **Edit** — smallest change that satisfies the task; reuse existing UI primitives / services / DTO patterns.
4. **Verify** — typecheck/lint/test the app you touched (see each app's AGENTS.md for exact commands).
5. **Summarize** — state what changed, what was verified, and anything left out.

## Cross-cutting facts agents get wrong

- **Backend validation:** a global `ValidationPipe({ whitelist: true })` strips any DTO field that lacks a `class-validator` decorator. Adding a property to a DTO without a decorator silently drops it from the request body.
- **Auth:** JWT bearer token; admin routes use `JwtAuthGuard + RolesGuard` with `@Roles('admin')`.
- **Seed data:** first backend boot creates `admin@shop.com / admin123`, `customer@shop.com / customer123`, and 20 products.
- **Catalog is URL-driven:** `/shop?category=…&q=…&sortBy=…&page=…`; `CatalogSection` treats the URL as the source of truth.
- **Theming:** global background gradients (light pastel sweep / dark aurora + starfield) live in `frontend/app/globals.css`; page sections are transparent so it shows through.
