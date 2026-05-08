# Examples

## 1) Jest + React Testing Library + MSW + Fishery

```ts
import { http, HttpResponse } from "msw";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { userFactory } from "@/test/factories/user-factory";
import { UserProfileCard } from "@/features/users/components/user-profile-card";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders user name from API", async () => {
  const user = userFactory.build({ name: "Ava Patel" });

  server.use(
    http.get("/api/users/me", () => {
      return HttpResponse.json(user);
    })
  );

  render(<UserProfileCard />);

  expect(await screen.findByRole("heading", { name: "Ava Patel" })).toBeInTheDocument();
});
```

## 2) Playwright + storageState + MSW (E2E)

```ts
import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json',
});

test('shows dashboard summary', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Revenue summary' }),
  ).toBeVisible();
});
```

Use accessibility-first selectors:

- `getByRole`
- `getByLabel`
- `getByText`

Use `getByTestId` only when role/text/label queries are not stable or feasible.

## 3) Clarification Prompt Template (Before Writing Tests)

Use this when the user prompt is ambiguous:

```md
Before I generate tests, I need 3 clarifications:

1. Test scope

- Should this be Unit, Integration, E2E, or a mix?

2. Critical flows and edge cases

- Which user journeys are highest priority?
- Which failure/empty/loading states must be covered?

3. Data contracts and browser targets

- Please share a sample API payload (or type schema) for the entities involved.
- What browser compatibility/test targets should I use?
  - If you say "use default", I’ll target stable Chromium + WebKit and last 2 versions of modern browsers.
```
