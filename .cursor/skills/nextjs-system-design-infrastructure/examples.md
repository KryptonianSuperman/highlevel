# Next.js System Design & Infrastructure Examples

Use these examples to keep architecture outputs consistent with the skill directives.

## Example 1: BFF Route Design

### User prompt

Design a Next.js route handler that aggregates profile and subscription data from two microservices.

### Expected response shape

- Defines a route handler as BFF composition only.
- Validates inbound query/body with Zod.
- Fetches downstream services with clear timeout/error handling.
- Validates each downstream payload with Zod before combining.
- Returns a UI-ready DTO (not raw downstream schemas).

### Example skeleton

```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const inputSchema = z.object({
  userId: z.string().uuid(),
});

const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const subscriptionSchema = z.object({
  plan: z.string(),
  status: z.enum(['active', 'paused', 'canceled']),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const inputResult = inputSchema.safeParse({
    userId: url.searchParams.get('userId'),
  });
  if (!inputResult.success) {
    return NextResponse.json(
      { errors: inputResult.error.format() },
      { status: 400 },
    );
  }

  const { userId } = inputResult.data;

  const [profileRes, subscriptionRes] = await Promise.all([
    fetch(`${process.env.PROFILE_SERVICE_URL}/profiles/${userId}`, {
      cache: 'no-store',
    }),
    fetch(`${process.env.BILLING_SERVICE_URL}/subscriptions/${userId}`, {
      cache: 'no-store',
    }),
  ]);

  if (!profileRes.ok || !subscriptionRes.ok) {
    return NextResponse.json(
      { error: 'Downstream service failure' },
      { status: 502 },
    );
  }

  const profileResult = profileSchema.safeParse(await profileRes.json());
  const subscriptionResult = subscriptionSchema.safeParse(
    await subscriptionRes.json(),
  );
  if (!profileResult.success || !subscriptionResult.success) {
    return NextResponse.json(
      { error: 'Invalid downstream payload' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    user: {
      id: profileResult.data.id,
      displayName: profileResult.data.name,
      subscriptionPlan: subscriptionResult.data.plan,
      subscriptionStatus: subscriptionResult.data.status,
    },
  });
}
```

## Example 2: Middleware-First Request Concerns

### User prompt

Where should auth redirect, locale detection, and experiment bucketing live in Next.js?

### Expected response shape

- Recommends `middleware.ts` for all pre-route concerns.
- Keeps page/layout/components free from these cross-cutting checks.
- Uses matcher scoping to avoid unnecessary middleware overhead.

### Example skeleton

```ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith('/app');
  const hasSession = Boolean(request.cookies.get('session'));

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const locale = request.cookies.get('locale')?.value ?? 'en';
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const response = NextResponse.next();
  response.headers.set(
    'x-exp-bucket',
    hasSession ? 'returning-user' : 'new-user',
  );
  return response;
}

export const config = {
  matcher: ['/', '/app/:path*'],
};
```

## Example 3: Gateway/Proxy Boundary Discipline

### User prompt

We already route traffic through an API gateway + Nginx sidecar. How should Next.js integrate?

### Expected response shape

- Treats gateway/proxy as routing and policy source of truth.
- Keeps Next.js focused on BFF orchestration and UI delivery.
- Avoids duplicate path rewriting and policy drift in app code.
- Documents assumptions about ownership of auth, rate limits, and service discovery.

### Example guidance checklist

- Define one internal service base URL contract from infra (`INTERNAL_API_BASE_URL`).
- Avoid re-implementing gateway routing tables in route handlers.
- Keep gateway concerns out of component logic.
- Emit stable BFF response contracts for frontend consumption.

## Example 4: MFE Deployment Compatibility

### User prompt

Design a Next.js host + remotes architecture with independent CI/CD.

### Expected response shape

- Uses explicit interface contracts between host and remotes.
- Avoids shared mutable runtime state between independently deployed units.
- Keeps remote integration behind versioned boundaries.
- Calls out rollback and compatibility strategy.

### Example guidance checklist

- Version host-remote contracts and validate shape at runtime where possible.
- Prefer event/message contracts over direct cross-app store mutation.
- Avoid lockstep release requirements across host and remotes.
- Keep each app deployable without synchronized pipeline gates.
