---
name: nextjs-system-design-infrastructure
description: Dictates the architectural usage of Next.js features, focusing on the Backend for Frontend (BFF) pattern, edge middlewares, and robust routing integrations within a wider microservices or micro-frontend ecosystem. Use when designing or refactoring Next.js architecture, BFF APIs, middleware strategy, gateway/proxy integration, or micro-frontend deployment boundaries.
---

# Next.js System Design & Infrastructure

Apply this skill when producing system design, architecture decisions, or implementation plans for Next.js applications that integrate with microservices, API gateways, reverse proxies, or micro-frontend platforms.

## Agent Directives

- Backend for Frontend (BFF) Pattern: Treat Next.js API routes and Server Actions strictly as a dedicated BFF layer. Use this layer to aggregate data from various downstream microservices, handle authentication securely, and shield the client-side application from complex backend business logic.
- Strict Boundary Validation: Enforce rigorous schema validation at the BFF boundary. Always use Zod to validate incoming requests from the client and to parse responses from external microservices before passing them to the UI.
- Edge Middlewares: Implement Next.js Edge Middleware for tasks that require execution before a request completes its cycle. Default to using middleware for route-level authentication guards, A/B testing traffic routing, and internationalization (i18n) redirects to keep these concerns out of the core component tree.
- Central Routing & Infrastructure Integration: When generating architecture that interacts with complex backend infrastructure (such as self-hosted services or API gateways), ensure the Next.js app interfaces cleanly with external orchestrator services or reverse proxies (like an Nginx sidecar). Do not duplicate central routing logic within the Next.js app if an upstream orchestrator is already managing it.
- Micro-Frontend (MFE) Compatibility: If the project is identified as a micro-frontend architecture (e.g., utilizing Single-SPA or Webpack Module Federation), ensure the system design accounts for autonomous deployments. Prevent the Next.js host or remote applications from tightly coupling their infrastructure in a way that blocks independent CI/CD pipelines.

## Operating Checklist

1. Confirm architecture context:
   - Standalone Next.js app vs microservices-backed platform.
   - Monolith frontend vs MFE (Single-SPA/Module Federation).
   - Presence of upstream orchestrator (API gateway, ingress, sidecar proxy).
2. Define BFF boundaries:
   - Keep orchestration and API composition in route handlers/Server Actions.
   - Keep domain logic in downstream services; do not migrate it into Next.js.
3. Enforce request/response contracts:
   - Validate client input with Zod before any downstream call.
   - Parse and validate downstream service responses with Zod before returning UI data.
4. Assign pre-request concerns to middleware:
   - Route protection/auth redirects.
   - Experiment bucketing/traffic shaping.
   - Locale detection and redirect policy.
5. Preserve infrastructure separation:
   - Respect upstream routing ownership.
   - Avoid duplicating gateway/orchestrator routing policy in app-level route logic.
6. Protect independent deployability in MFEs:
   - Avoid shared runtime coupling that requires lockstep releases.
   - Keep host-remote contracts explicit, versioned, and minimal.

## Response Expectations

- Prioritize architecture-level guidance over component-level implementation.
- When proposing code, show BFF-centric patterns with explicit Zod validation boundaries.
- Call out where middleware is preferred over in-component logic.
- Explicitly note integration assumptions (gateway ownership, auth source, MFE runtime).

## Additional Resources

- For concrete prompt/response patterns, see [examples.md](examples.md).
