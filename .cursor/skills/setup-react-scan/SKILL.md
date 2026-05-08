---
name: setup-react-scan
description: Drafts React Scan integration steps for React or Next.js projects, including development-only initialization at the root entry path. Use when setting up runtime render/performance profiling with React Scan.
disable-model-invocation: true
---

# Setup React Scan

## Instructions

1. Inspect the project structure and identify the correct root entry point:
   - Next.js App Router: `app/layout.tsx`
   - Next.js Pages Router: `pages/_app.tsx`
   - React app entry: `src/main.tsx` or equivalent
2. Draft the minimal integration code for React Scan initialization.
3. Ensure initialization is strictly guarded by:
   - `process.env.NODE_ENV === "development"`
4. Keep production behavior unchanged.
5. Return:
   - Proposed file-level patch plan.
   - Exact code snippet(s) to add.
   - Verification steps to confirm profiling is active in development only.
6. Do not modify layout or entry files until the user confirms.

## Output Format

Use this structure:

````markdown
# React Scan Setup Plan

## Detected Entry Point

- File:
- Rationale:

## Proposed Changes

- Change 1:
- Change 2:

## Draft Code

```tsx
// snippet
```

## Verification

- [ ] Dev mode enables React Scan
- [ ] Production build excludes/react-scan is inactive
- [ ] No runtime errors at app bootstrap
````

## Additional Resources

- See implementation examples in [examples.md](examples.md)
