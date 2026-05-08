# `@optimize-tti` Examples

## Example 1: Massive Interactive Grid

**Prompt**
`@optimize-tti Analyze this grid component that renders 50k+ cells with inline editors and row selection.`

**Expected focus**

- Main-thread hotspots in cell derivation and formatting
- Virtualization recommendations
- Concurrent rendering opportunities (`useTransition`, `useDeferredValue`)
- Worker offloading candidates for heavy transforms

---

## Example 2: High-Frequency Telemetry Dashboard

**Prompt**
`@optimize-tti Review this telemetry panel ingesting ~3,000 events/sec and suggest refactors to reduce input lag.`

**Expected focus**

- Event parsing/batching offloading to a Web Worker
- Backpressure and throttling strategy before React state updates
- Stabilizing render cadence under burst traffic
- Memoization corrections for expensive selectors

---

## Example 3: Animation-Heavy Client UI

**Prompt**
`@optimize-tti Audit this animated timeline component for frame drops during drag and zoom interactions.`

**Expected focus**

- DOM depth and paint/layout pressure
- Whether Canvas/WebGL should replace parts of DOM rendering
- Deferring non-urgent updates with concurrent React patterns
- Callback and computed-value memoization audit

---

## Example 4: Two-Phase Behavior (Analyze Then Wait)

**Prompt**
`@optimize-tti Evaluate this TSX component and give only the analysis report first.`

**Expected behavior**

1. The skill returns a markdown report titled **TTI & Main Thread Analysis.**
2. It does **not** generate refactored code yet.
3. It ends with:

> **"Please confirm if you would like me to proceed with generating the refactored code based on these recommendations."**

Only after user confirmation (for example: "Proceed", "Looks good", or "Do it") should refactored code be produced.
