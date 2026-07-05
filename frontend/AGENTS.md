<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Frontend (Next.js storefront + admin)

Rules for AI agents working in `frontend/`. See the root [AGENTS.md](../AGENTS.md) for monorepo-wide rules. The Next.js-version warning above is mandatory — **read `node_modules/next/dist/docs/` before writing framework code.**

## Stack

Next.js 16 (App Router) · React 19 · Redux Toolkit + RTK Query · redux-persist · Tailwind CSS 4 (CSS-first config) · Stripe.js · framer-motion · lucide-react. Dev server on port **3000**; talks to the API at `http://localhost:3001/api`.

## Commands

```bash
cd frontend
npm install
npm run dev            # → http://localhost:3000
npm run build          # production build
npm run lint           # ESLint
npx tsc --noEmit       # typecheck (no test suite in this app)
```

After any change, run `npx tsc --noEmit` and `npm run lint` and report results.

## Directory layout

```
app/                  # App Router routes (route groups: (storefront), (admin), auth)
sections/             # Page-level feature sections — most UI logic lives here
  storefront/         #   Catalog, Sale, ProductDetail, Cart, Checkout, Orders, Home, static pages
  admin/              #   Dashboard, Orders, Products
custom-components/     # Reusable UI
  ui/                 #   Primitives: Button, Input, Skeleton, Modal, Filters, … (see ui/index.ts)
  layout/             #   Navbar, footer, etc.
  product/            #   ProductCard, ProductGrid, ProductList, ProductSort
services/             # RTK Query API slices (baseApi + per-resource slices)
store/                # Redux store, slices (auth, cart), typed hooks
lib/                  # constants (CATEGORIES, SORT_OPTIONS, PAGE_SIZE), utils (cn, formatPrice)
types/                # shared TS types
```

A `page.tsx` should stay thin — render the matching `Section`. Put real logic in the section.

## Conventions — follow these exactly

- **Data fetching:** always through RTK Query hooks from `services/` (e.g. `useGetProductsQuery`). Don't hand-roll `fetch`. Add a new endpoint to the relevant slice rather than calling the API directly.
- **State:** server data → RTK Query cache; app state (auth, cart) → Redux slices in `store/` accessed via `useAppSelector` / `useAppDispatch`. Don't duplicate server data into local state.
- **Styling:** Tailwind utility classes only; merge conditional classes with `cn()` from `lib/utils`. Tailwind v4 is configured CSS-first in `app/globals.css` — there is no `tailwind.config.js`. Dark mode uses the `dark` class variant.
- **Theming/background:** the global gradients (light pastel sweep, dark aurora + starfield) and animations live in `app/globals.css`. Page sections are transparent so the body gradient shows through — don't add opaque page backgrounds.
- **Loading states:** use the `Skeleton` primitives (`custom-components/ui/Skeleton.tsx`) — `SkeletonCard`, `SkeletonText`, `SkeletonTable`, or `ProductGrid`/`ProductList`'s `loading` prop — not bare spinners or "Loading…" text.
- **Icons:** import from `lucide-react`. Verify the icon name exists in the installed version before using it.
- **URL-driven catalog:** `/shop?category=…&q=…&sortBy=…&page=…`. `CatalogSection` keeps local filter state in sync with the URL via the render-time "adjust state when a value changes" pattern (not an effect) — preserve that when editing it.
- **React hooks lint:** avoid `setState` inside `useEffect` for derived/URL state, and don't define components inside render (`react-hooks/static-components`). Some pre-existing violations exist; don't add new ones.

## Categories

Product categories come from `CATEGORIES` in `lib/constants.ts`. The navbar Categories mega-menu and shop filters both derive from product data — link categories to `/shop?category=<encoded>`.

