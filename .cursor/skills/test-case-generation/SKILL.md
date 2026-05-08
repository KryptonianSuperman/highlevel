---
name: test-case-generation
description: Generates robust test cases using Playwright, Jest, MSW, and Fishery with strict ambiguity checks, typed mock data, and consistent network mocking. Use when writing or reviewing unit, integration, or E2E test suites and related test infrastructure.
disable-model-invocation: true
---

# Writing Test Cases (Playwright / Jest / MSW / Fishery)

## Agent Behavior & Ambiguity Resolution

- Scope & Edge Cases: If the test scope (Unit, Integration, E2E) or the specific edge cases are not defined in the prompt, halt and ask for clarification regarding the critical user flows before generating any code.
- Missing Fixtures: Do not hallucinate data structures. If the API response or domain entity structure is unknown, ask for a sample payload before generating fishery factories or MSW handlers.
- Browser Compatibility: Always ask for the desired browser compatibility and testing targets. If the response is "use default," automatically configure the test environments to target strictly stable Chromium and WebKit, and the last 2 versions of modern browsers.

## Mock Data Generation (Fishery)

- Type-Safe Factories: Use fishery to build strictly typed data factories for all domain entities. Avoid using any or loose generic types.
- Dynamic & Overridable Data: Define sensible defaults in the base factory. When writing test cases, use the .build() method to generate data and pass explicit overrides only for the properties relevant to the specific test scenario.
- Seamless Integration: Use fishery outputs as the payload for MSW response handlers to guarantee that the UI components, network layer, and test assertions all share the exact same data structures.

## Mocking with MSW (Mock Service Worker)

- Universal Source of Truth: Intercept network requests across both Playwright (Browser environment) and Jest (Node environment) using MSW to maintain consistent mock definitions.
- Server State Handling: When testing components that consume server state via RTK Query or TanStack Query, define MSW request handlers (e.g., http.get, http.post) to intercept those endpoints. Never mock the query hook or Redux slice directly.

## Playwright (E2E & Component Testing) - Primary Priority

- Locator Strategy: Prioritize accessibility-first locators (getByRole, getByText, getByLabel). Fall back to getByTestId only as a last resort when structural queries are impossible or too fragile.
- Network Interception: Rely on MSW browser integration to handle backend calls, ensuring deterministic, flake-free test runs without network latency.
- Authentication: Use Playwright's storageState to inject session cookies or tokens, bypassing the UI login flow for standard E2E suites (unless specifically testing the authentication flow).

## Jest & React Testing Library (Unit & Component Integration)

- Component Variants (CVA & Tailwind): For UI components constructed with CVA, twMerge, and clsx, verify that the correct behavioral states, conditional overrides, and default variants render successfully. Assert on the presence of computed utility classes only when validating specific behavioral logic.
- Environment Isolation: Ensure setupFilesAfterEnv correctly resets MSW handlers (server.resetHandlers()) and completely cleans up the DOM between tests to prevent global mock leakage.

## Execution Workflow

1. Clarify test scope, critical flows, and edge cases before writing code.
2. Confirm browser/test target matrix (or apply default compatibility targets when user says "use default").
3. Collect or request real payload samples before defining factories/handlers.
4. Define typed Fishery factories with sensible defaults.
5. Reuse Fishery output in MSW handlers for Jest and Playwright paths.
6. Implement tests with accessibility-first selectors and deterministic network behavior.
7. Validate isolation/cleanup so tests are independent and repeatable.

## Additional Resources

- See practical templates in [examples.md](examples.md)
- See structure and setup conventions in [reference.md](reference.md)
