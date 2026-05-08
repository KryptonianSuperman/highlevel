---
name: analyze-profiler-data
description: Interprets React Profiler exports, Chrome DevTools heap snapshots, and Web Vitals summaries to identify CPU and memory bottlenecks. Use when users share profiling output or ask for optimization guidance.
disable-model-invocation: true
---

# Analyze Profiler Data

## Instructions

1. Ask the user for one of the following inputs:
   - React Profiler export JSON.
   - Chrome DevTools Memory Heap Snapshot summary.
   - PageSpeed Insights or Web Vitals summary (focus on INP/LCP).
2. Parse and inspect the provided data for:
   - Components with largest render time/cumulative render cost.
   - Re-render hotspots and frequent commit patterns.
   - Objects/components with high memory retention.
   - CPU spikes linked to specific component trees or interactions.
3. Produce an analysis that includes:
   - Top offenders ranked by impact.
   - Root-cause hypothesis for each offender.
   - Concrete React optimization recommendations (for example `useMemo`, `useCallback`, list virtualization, memoized selectors, splitting heavy subtrees).
4. Provide an implementation plan but do not apply code changes yet.
5. Wait for explicit user confirmation before implementing any fix.

## Output Format

Use this structure:

```markdown
# Profiling Analysis Report

## Input Summary

- Data source:
- Time range / interaction:

## Top Offenders

1. Component/Path - impact summary
2. Component/Path - impact summary

## Root Cause Analysis

### Offender 1

- Evidence:
- Likely cause:

## Optimization Plan

- Immediate wins:
- Structural improvements:
- Validation metrics to track (INP, LCP, render time, retained size):

## Ready-to-Implement Fixes

- [ ] Fix A
- [ ] Fix B
```

## Additional Resources

- See sample analyses in [examples.md](examples.md)
