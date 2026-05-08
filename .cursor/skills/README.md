# Project Skills Index

This document lists custom project skills in `.cursor/skills/` and when to use them.

## Available Skills

- `audit-memory-leaks`
  - Purpose: Audit React/Next.js code for CSR + SSR memory leak risks.
  - Use when: Reviewing a file/component for missing cleanup, unclosed resources, global retention, or detached refs.
  - Behavior: Produces a detailed Analysis Report and waits for confirmation before code changes.

- `setup-react-scan`
  - Purpose: Draft React Scan setup for React or Next.js entry/root files.
  - Use when: Enabling runtime render/performance profiling in development.
  - Behavior: Proposes guarded setup (`process.env.NODE_ENV === "development"`) and waits for confirmation before editing.

- `analyze-profiler-data`
  - Purpose: Interpret React Profiler, Heap Snapshot, and Web Vitals data.
  - Use when: Investigating CPU spikes, memory retention, INP/LCP regressions, or re-render hotspots.
  - Behavior: Returns ranked offenders + optimization plan (`useMemo`, `useCallback`, virtualization, etc.) and waits for confirmation before implementation.

- `scaffold-ui-component-cva`
  - Purpose: Scaffold new scalable UI components with `class-variance-authority` and `cn`.
  - Use when: Creating a new component, scaffolding a UI element, or building a foundational UI block.
  - Behavior: Generates TSX boilerplate with `cva` variants, strict default variants, typed props, and exported function component syntax.

- `file-structure-architectural-boundaries`
  - Purpose: Enforce feature-driven codebase structure and clear architectural module boundaries.
  - Use when: Creating architectural scaffolding, reorganizing folders, or defining monolith vs micro-frontend boundaries.
  - Behavior: Confirms architecture context first, then applies collocation, internal type modeling, and barrel export boundaries.

- `state-management-decision-matrix`
  - Purpose: Establish a strict decision matrix for local, server, global, and URL state to prevent anti-patterns and protect performance.
  - Use when: Implementing or refactoring state management, data fetching, caching, shared state, filters, tabs, pagination, or search params.
  - Behavior: Enforces boundary questions first, routes API state to RTK Query (or TanStack Query), and avoids API-in-global-store + useEffect-fetching patterns.

- `nextjs-system-design-infrastructure`
  - Purpose: Dictate Next.js architecture for BFF layering, edge middleware, and infrastructure routing boundaries.
  - Use when: Designing/refactoring Next.js systems that integrate with microservices, API gateways, reverse proxies, or micro-frontends.
  - Behavior: Enforces BFF-first boundaries, Zod validation at ingress/egress, middleware-first pre-request concerns, and autonomous MFE deployability.

## How to Invoke

Use the skill by name in your prompt, for example:

- `/audit-memory-leaks`
- `/setup-react-scan`
- `/analyze-profiler-data`
- `/scaffold-ui-component-cva`
- `/file-structure-architectural-boundaries`
- `/state-management-decision-matrix`
- `/nextjs-system-design-infrastructure`
