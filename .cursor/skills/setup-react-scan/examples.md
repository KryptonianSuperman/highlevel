# Examples

## Example Request

User asks:
"Set up React Scan in this Next.js app."

Expected behavior:

- Detect whether project uses App Router or Pages Router.
- Provide development-only setup guarded by `process.env.NODE_ENV === "development"`.
- Share patch plan and code snippet.
- Wait for user confirmation before editing files.

## Example Snippet

```tsx
if (process.env.NODE_ENV === 'development') {
  const { scan } = await import('react-scan');
  scan({ enabled: true });
}
```
