---
name: audit-memory-leaks
description: Scans the current file or highlighted React/Next.js component tree for potential memory leaks across CSR and SSR paths. Use when auditing cleanup behavior, investigating leaks, or reviewing lifecycle/resource handling.
disable-model-invocation: true
---

# Audit Memory Leaks

## Instructions

1. Analyze only the code the user provides (current file, selection, or pasted snippets).
2. Check for memory leak risks in both client and server execution paths.
3. Focus on:
   - Missing cleanup in `useEffect`/custom hooks (timers, listeners, observers, subscriptions, async tasks).
   - Unclosed SSR resources (streams, sockets, DB clients, event emitters, long-lived handles).
   - Global/module-scope mutable state that can retain stale references across renders/requests.
   - Detached refs or DOM/resource references that outlive component lifecycle.
4. Return a detailed **Analysis Report** with:
   - Risk summary.
   - Findings grouped by severity (`high`, `medium`, `low`).
   - Evidence (file/symbol and why it can leak).
   - Proposed fix strategy for each finding.
   - Validation checklist to confirm leak prevention.
5. Do not automatically rewrite files.
6. Ask for user confirmation before applying any proposed fix.

## Output Format

Use this structure:

```markdown
# Analysis Report: Memory Leak Audit

## Scope

- Files/components reviewed
- Runtime context (CSR, SSR, or both)

## Risk Summary

- High: X
- Medium: Y
- Low: Z

## Findings

### [Severity] Finding title

- Evidence:
- Why this is risky:
- Proposed fix:
- Expected impact:

## Validation Checklist

- [ ] Cleanup verified on unmount/request end
- [ ] No retained stale references
- [ ] No long-lived unbounded listeners/handles
```

## Additional Resources

- See practical examples in [examples.md](examples.md)
