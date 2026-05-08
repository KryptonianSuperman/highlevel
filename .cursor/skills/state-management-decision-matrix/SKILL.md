---
name: state-management-decision-matrix
description: Establishes a strict decision-making matrix for managing application data across local, server, global, and URL state paradigms to ensure performance and prevent anti-patterns. Use when implementing or refactoring state management, data fetching, caching, global stores, filters, tabs, pagination, search params, or deciding where state should live.
---

# State Management Decision Matrix

## Core Rule

Always choose the narrowest valid state boundary first. Resolve ambiguity before implementation.

## Agent Directives

- Ambiguity Resolution: When the optimal location for a piece of data is unclear, explicitly ask the user for input to determine the correct state boundary before writing the implementation.
- Local State (The Default): Ask, "Does only this component care?" Default to local state (`useState`, `useReducer`) if the data is utilized by a single component or a small, intimately connected group (e.g., dropdown toggles, text input values, form validation errors). This isolates logic and prevents unnecessary cascading re-renders.
- Server State (API Data): Ask, "Did this data come from an API?" Any state originating from a backend (database, API, cache) must be managed as Server State to handle caching, background updates, and synchronization.
- Implementation Routing: Adapt dynamically to the project's existing ecosystem. If Redux Toolkit is present, strictly utilize RTK Query for server state; otherwise, implement TanStack Query.
- Strict Constraint: Never store API responses in Redux slices or Zustand stores unless absolutely unavoidable, and actively avoid using `useEffect` for standard data fetching.
- Global Stores: Ask, "Do distant parts of the app need this?" Implement a global store only when state must be accessed by disparate, non-connected parts of the application (e.g., authenticated user sessions, theme preferences, complex multi-step form data). Use this specifically to eliminate prop drilling.
- URL State: Ask, "Does this need to be shareable or deep-linkable?" If the state represents a shareable view (e.g., current search terms, page numbers, active filters, selected tabs), it must be persisted and read directly from the URL parameters.

## Decision Flow

1. Ask: "Does only this component care?"
   - Yes -> Local state (`useState`/`useReducer`)
   - No -> Continue
2. Ask: "Did this data come from an API?"
   - Yes -> Server state (RTK Query if Redux Toolkit exists, otherwise TanStack Query)
   - No -> Continue
3. Ask: "Does this need to be shareable or deep-linkable?"
   - Yes -> URL state (search params/path params as appropriate)
   - No -> Continue
4. Ask: "Do distant parts of the app need this?"
   - Yes -> Global store
   - No -> Keep state local to closest common parent

## Hard Constraints

- Do not place API response data in Redux slices or Zustand by default.
- Do not use `useEffect` as the standard API fetching mechanism when RTK Query or TanStack Query should own server-state lifecycle.
- If uncertain between two boundaries, stop and ask the user before coding.
