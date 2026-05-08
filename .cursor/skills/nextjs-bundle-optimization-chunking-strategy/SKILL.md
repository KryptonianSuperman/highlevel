---
name: nextjs-bundle-optimization-chunking-strategy
description: Optimizes Next.js bundle size and chunking strategy by enforcing server-first architecture, targeted lazy loading, native Next.js optimizations, and bundle budget guardrails. Use when writing, refactoring, or reviewing Next.js code that affects client payload, dependencies, assets, or runtime performance.
---

# Next.js Bundle Optimization & Chunking Strategy

## Core Objective

Minimize client-side JavaScript and asset cost in every Next.js change. Prefer native Next.js optimization features before introducing custom runtime solutions.

## Decision Rules

1. **Server-first architecture**
   - Default to React Server Components.
   - Add `"use client"` only at the lowest possible leaf that requires interactivity, React hooks, or browser-only APIs.
   - Keep heavy data fetching, shaping, and formatting libraries on the server whenever possible.
   - Treat server imports as preferred when they reduce shipped client JS.

2. **Dynamic import and lazy-loading discipline**
   - Use `next/dynamic` for heavy client-only UI not needed for first paint (charts, maps, rich editors).
   - Use `ssr: false` only when component behavior is browser-only.
   - Dynamically import interaction-gated UI (modals, drawers, inspectors, advanced filters) so code is fetched on trigger.
   - Do not top-level import heavy optional features in route-critical client trees.

3. **Native Next.js optimization requirements**
   - Use `next/image` for images to get automatic responsive sizing and modern formats.
   - Use `next/font` for local/Google fonts to reduce layout shift and avoid extra external requests.
   - Use `next/script` with non-blocking strategies (`lazyOnload` or `worker` when appropriate) for analytics/third-party scripts.
   - For modular libraries with large barrel exports, ensure `optimizePackageImports` is configured in `next.config.js`.

4. **Styling and polyfill discipline**
   - Keep styling on Tailwind + CVA patterns (`cva` + `clsx` + `twMerge`) and avoid runtime CSS-in-JS additions.
   - Assume SWC transpilation is the baseline.
   - Suggest explicit polyfills only when a concrete browser support requirement demands it.
   - Before recommending polyfills, verify existing build/pipeline/browser-target support.

5. **Bundle budgets and dependency gatekeeping**
   - Evaluate new package weight before adoption; prefer lighter alternatives when feasible (for example `date-fns` over heavier date stacks).
   - Recommend `@next/bundle-analyzer` for visibility into per-route and shared chunks.
   - Flag risk when route chunks trend into the `150KB-200KB` range (post-build JS artifact scale).
   - Note that gzip is automatic in Next.js output, and remind teams to enable Brotli (`.br`) at CDN/proxy/edge when supported.

## Required Workflow

Follow this checklist during implementation or review:

```md
Bundle Optimization Checklist

- [ ] Server Component by default; "use client" only where strictly needed
- [ ] Heavy optional UI loaded via dynamic import
- [ ] next/image and next/font used where applicable
- [ ] Third-party scripts use non-blocking next/script strategy
- [ ] New dependencies evaluated for bundle impact
- [ ] Bundle analyzer recommended/used when payload risk increases
- [ ] Route chunk size reviewed against 150KB-200KB warning band
- [ ] Brotli serving support verified in deployment infrastructure
```

## Output Expectations

When proposing changes, include:

1. **Payload impact statement**: what client JS or asset cost was reduced/contained.
2. **Chunking rationale**: why code runs on server, initial client bundle, or deferred chunk.
3. **Risk notes**: browser compatibility/polyfill considerations and dependency-size trade-offs.
4. **Verification step**: how to confirm with analyzer/build output.

## Example Guidance Snippets

### Client-only heavy widget

```tsx
const AnalyticsPanel = dynamic(
  () => import('@/features/analytics/components/analytics-panel'),
  { ssr: false, loading: () => <AnalyticsPanelSkeleton /> },
);
```

### Interaction-gated component

```tsx
const FiltersDrawer = dynamic(
  () => import('@/features/search/components/filters-drawer'),
);
```

### Script strategy

```tsx
<Script src="https://example.com/analytics.js" strategy="lazyOnload" />
```

## Anti-Patterns to Reject

- Broad `"use client"` at page/layout level without necessity.
- Top-level imports for heavy features hidden behind a click path.
- Introducing runtime CSS-in-JS for styling already solvable by Tailwind/CVA.
- Adding large libraries without checking size and alternatives.
- Recommending blanket polyfills without explicit browser-target evidence.

## Additional Resources

- For concrete implementation patterns, see [examples.md](examples.md).
