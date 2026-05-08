---
name: data-fetching-rigger
description: Guides data fetching architecture for Next.js pages and data-heavy UI by splitting SEO/initial load data from interactive data flows. Use when generating a new page, fetching data, or building data-heavy UI components like tables, lists, and dashboards.
---

# Data Fetching Rigger

Use this skill whenever generating a new page, fetching data, or building data-heavy UI components (tables, lists, dashboards).

## Instructions for Cursor

1. Core Mental Model:
   Evaluate the data requirements before writing fetch logic. Separate concerns into "Initial Page Load / SEO Data" and "Dynamic / Interactive UI Data."

2. Server-Side Fetching (Default for Pages & Initial Loads):

- For layout data, initial page loads, and static content, execute data fetching exclusively inside React Server Components using the native Next.js fetch API.
- Caching Mandate: Always utilize granular caching. Attach appropriate revalidate tags (e.g., `next: { tags: ['entity-name'] }`) to allow for targeted cache invalidation via Server Actions. Do not use generic time-based revalidation unless explicitly asked.

3. Client-Side Fetching (For Interactive & Complex UI):

- Do not hesitate to use client-side fetching libraries (like React Query or SWR) when the component handles complex data flows.
- Approved Client-Side Use Cases:
  - Tabular data requiring client-side pagination, sorting, or filtering.
  - Highly dynamic UIs linked to animations or complex state handling.
  - Real-time data polling.
  - User-session-specific data that cannot be statically cached.
- When implementing client-side fetching, ensure it is cleanly separated from Server Components, passing only necessary initial data or IDs down as props to the Client Component.
