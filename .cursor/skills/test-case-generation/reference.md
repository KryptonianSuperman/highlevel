# Reference

## Recommended Folder Structure

```txt
src/
  features/
    users/
      components/
      api/
test/
  factories/
    user-factory.ts
    order-factory.ts
  msw/
    handlers.ts
    browser.ts
    server.ts
  utils/
    render-with-providers.tsx
playwright/
  .auth/
    user.json
```

## Fishery Conventions

- Keep one factory per domain entity in `test/factories`.
- Export typed factory instances (e.g., `userFactory`).
- Use `.build(overrides)` in tests; avoid ad-hoc object literals for API entities.

## MSW Conventions

- Define shared endpoint handlers in `test/msw/handlers.ts`.
- Use `test/msw/server.ts` for Jest (Node runtime).
- Use `test/msw/browser.ts` for browser runtime integrations.
- Prefer handler overrides inside tests only for scenario-specific behavior.

## Jest Setup Baseline

Include these in `setupFilesAfterEnv`:

- `server.listen()` before all tests
- `server.resetHandlers()` after each test
- `server.close()` after all tests
- DOM cleanup between tests

## Playwright Setup Baseline

- Store authenticated session files under `playwright/.auth/`.
- Use `test.use({ storageState: "playwright/.auth/user.json" })` for non-auth-flow suites.
- Keep selectors accessibility-first (`getByRole`, `getByLabel`, `getByText`) before `getByTestId`.

## Browser Target Default

If the user says "use default", target:

- stable Chromium
- stable WebKit
- last 2 versions of modern browsers
