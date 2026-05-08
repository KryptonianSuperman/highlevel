# Next.js Bundle Optimization Examples

## 1) Server-first page composition

### Good

```tsx
// app/reports/page.tsx (Server Component by default)
import { getReportData } from '@/features/reports/server/get-report-data';
import { ReportsTable } from '@/features/reports/components/reports-table';
import ReportsFiltersClient from '@/features/reports/components/reports-filters-client';

export default async function ReportsPage() {
  const data = await getReportData();

  return (
    <>
      <ReportsFiltersClient />
      <ReportsTable rows={data.rows} />
    </>
  );
}
```

Why: data fetching and heavy shaping stay server-side; only interactive filters are client code.

### Bad

```tsx
'use client';

import { useEffect, useState } from 'react';
import { getReportData } from '@/features/reports/server/get-report-data';

export default function ReportsPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getReportData().then((data) => setRows(data.rows));
  }, []);
  return <div>{rows.length}</div>;
}
```

Why bad: page-level `"use client"` pulls more code into the browser and moves server-appropriate logic client-side.

## 2) Dynamic import for heavy widgets

### Good

```tsx
import dynamic from 'next/dynamic';

const RevenueChart = dynamic(
  () => import('@/features/analytics/components/revenue-chart'),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse rounded bg-muted" />,
  },
);

export function AnalyticsSection() {
  return <RevenueChart />;
}
```

Why: chart code is deferred and excluded from SSR when browser-only.

### Bad

```tsx
import { RevenueChart } from '@/features/analytics/components/revenue-chart';

export function AnalyticsSection() {
  return <RevenueChart />;
}
```

Why bad: eager import makes heavy chart dependencies part of the initial client payload.

## 3) Interaction-gated modal loading

### Good

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const ExportModal = dynamic(
  () => import('@/features/export/components/export-modal'),
);

export function ExportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Export</button>
      {open ? <ExportModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}
```

Why: modal bundle downloads only after user intent.

### Bad

```tsx
'use client';

import { ExportModal } from '@/features/export/components/export-modal';

export function ExportButton() {
  // ...hidden behind click, but already bundled
  return <ExportModal />;
}
```

Why bad: code is paid upfront even if most users never open the modal.

## 4) Next.js-native media and script optimization

### Good

```tsx
import Image from 'next/image';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function Hero() {
  return (
    <section className={inter.className}>
      <Image
        src="/hero.jpg"
        alt="Dashboard preview"
        width={1280}
        height={720}
        priority
      />
      <Script src="https://example.com/analytics.js" strategy="lazyOnload" />
    </section>
  );
}
```

Why: optimized image/font delivery and non-blocking script loading.

### Bad

```tsx
export function Hero() {
  return (
    <section>
      <img src="/hero.jpg" alt="Dashboard preview" />
      <script src="https://example.com/analytics.js"></script>
    </section>
  );
}
```

Why bad: misses Next.js optimization pipeline and can block main thread work.

## 5) Dependency budget decisions

### Good

```txt
Need: date formatting and parsing in one feature
Choice: date-fns with direct function imports
Rationale: modular imports, smaller footprint, easy tree-shaking
Verification: inspect chunk delta with @next/bundle-analyzer
```

### Bad

```txt
Need: simple date formatting
Choice: large all-in-one date library by default
Rationale: familiar API only
Verification: none
```

Why bad: dependency weight added without budget analysis or chunk impact validation.

## 6) Chunk-size guardrail response

If a route chunk starts approaching `150KB-200KB`, apply this triage:

1. Move non-interactive logic to Server Components.
2. Split optional features behind `next/dynamic`.
3. Replace heavy dependencies with smaller alternatives.
4. Re-run analyzer and confirm chunk delta before merge.
