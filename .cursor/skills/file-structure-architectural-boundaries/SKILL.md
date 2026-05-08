---
name: file-structure-architectural-boundaries
description: Enforces strict codebase organization, modular boundaries, and structural patterns for Next.js monolith and micro-frontend architectures. Use when creating architectural boilerplates, scaffolding folders, reorganizing code structure, or defining feature/module boundaries.
---

# File Structure & Architectural Boundaries

## Instructions

Follow this workflow when generating or restructuring project architecture.

### 1) Determine architecture context first

- Classify the target as one of:
  - Next.js Monolith
  - Micro-Frontend (Single-SPA, Webpack Module Federation, or equivalent)
- If architecture type is unknown, ask the user before generating scaffolding.
- Do not proceed with structural boilerplate until architecture context is confirmed.

### 2) Enforce feature-driven root organization

- Organize top-level application structure by feature/domain, not by file type.
- Preferred examples:
  - `src/features/auth/`
  - `src/features/checkout/`
- Avoid global folders that centralize by technical role for feature-owned code (for example, global `components/` or `hooks/` buckets for feature-specific files).
- Ensure each feature encapsulates its own UI, hooks, services, and business logic.

### 3) Apply strict internal type-driven modeling

- Inside each feature module, define explicit TypeScript domain models.
- Use interfaces or domain object types to represent feature data contracts.
- Keep models local to the feature unless shared by multiple features.
- Maintain consistent naming and data-shape conventions across features.

### 4) Enforce collocation

- Place files that change together in the same local module area.
- For Next.js routes, collocate route artifacts near the owning route entry:
  - Keep route-level components, tests, and route-local utilities with the route folder containing `page.tsx` or `route.ts`.
- Prefer discoverability and local reasoning over distant cross-directory coupling.

### 5) Require barrel exports at module boundaries

- Add `index.ts` at the root of feature/component directories to define public exports.
- Treat barrel files as the module boundary surface and keep internal folders private by default.
- Import from the barrel path externally; avoid deep imports into feature internals unless explicitly justified.

## Output Expectations

When responding with architecture/scaffolding guidance, provide:

1. Confirmed architecture mode (or explicit clarification request if missing)
2. Proposed folder structure using feature-driven boundaries
3. Public module surfaces via `index.ts` barrel exports
4. Notes on collocation and type-model placement decisions

## Example Skeletons

### Next.js monolith (feature-driven + route collocation)

```txt
src/
  app/
    checkout/
      page.tsx
      checkout-page.test.tsx
      components/
      utils/
  features/
    auth/
      components/
      hooks/
      models/
      services/
      index.ts
    checkout/
      components/
      hooks/
      models/
      services/
      index.ts
```

### Micro-frontend (module boundary focused)

```txt
apps/
  shell/
  auth-mf/
    src/features/auth/
      components/
      hooks/
      models/
      services/
      index.ts
  checkout-mf/
    src/features/checkout/
      components/
      hooks/
      models/
      services/
      index.ts
```
