# Next.js 16 Production Boilerplate

Production-ready starter using App Router + RSC boundaries, TypeScript strict mode, Tailwind v4 + CVA utilities, Redux Toolkit + RTK Query, Zod validation, MSW mocks, and Vitest.

## Requirements

- Node `20.9+` (managed via `.nvmrc`)
- pnpm `10+`

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` / `pnpm lint:fix`
- `pnpm typecheck`
- `pnpm test` / `pnpm test:watch` / `pnpm test:ui`
- `pnpm analyze` — run bundle analyzer build
- `pnpm mock` — dev mode with MSW enabled
- `pnpm audit:architecture` — AST architecture checks

## Folder Structure

- `src/app` — routes, segment boundaries, server actions, route handlers
- `src/features` — feature modules (`models/services/hooks/components/store`)
- `src/services` — RTK Query base API (`api.ts`) + endpoint injection
- `src/store` — Redux store, typed hooks, provider
- `src/shared` — shared UI primitives, utilities, hooks, contexts
- `src/core` — env parsing, api helpers, mocks, core config
- `test` — Vitest setup, helpers, and test specs
- `scripts` — tooling scripts (includes architecture audit)

## Conventions

- TypeScript only (`.ts` / `.tsx`), no `any`
- Zod-first validation for env and API boundaries
- Server-first data fetching (RSC), server actions for mutations
- RTK Query for server state; slices for UI state only
- Tailwind utilities + CVA variants + `cn()` helper
- Segment-level `loading.tsx` and `error.tsx` boundaries
