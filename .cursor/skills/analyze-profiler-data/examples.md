# Examples

## Example Request

User asks:
"Here is my React Profiler JSON. Help me find render bottlenecks."

Expected behavior:

- Identify slow components and frequent commit paths.
- Rank offenders by measured impact.
- Recommend actionable optimizations (`useMemo`, `useCallback`, virtualization, splitting subtrees).
- Ask for confirmation before making code changes.

## Example Recommendation

- **Offender:** `DataTable` re-renders on every parent state update.
- **Evidence:** High commit count and repeated expensive cell render durations.
- **Suggested fix:** Memoize columns/data transforms and wrap row cells with `React.memo`; virtualize rows for large datasets.
