# Examples

## Example Request

User asks:
"Audit this dashboard component for memory leaks."

Expected behavior:

- Review effects, listeners, timers, subscriptions, refs, and SSR resource handling.
- Produce an Analysis Report with severity, evidence, and fix strategies.
- Stop before editing code and request confirmation.

## Example Finding

- **Severity:** high
- **Evidence:** `useEffect` registers `window.addEventListener("resize", onResize)` with no cleanup.
- **Why risky:** Listener survives unmount and retains component closures.
- **Proposed fix:** Return cleanup function removing listener; ensure stable handler identity.
