---
name: advanced-react-ui-design-patterns
description: Enforces robust, composable React and Next.js UI architecture patterns for scalable components, clear separation of concerns, and consistent styling systems. Use when designing or refactoring complex UI components, component APIs, reusable design system primitives, or feature layouts involving compound components, slots, container/presentational boundaries, HOCs, or CVA-based variants.
---

# Advanced React & UI Design Patterns

## Instructions

Apply these directives when creating or refactoring UI architecture:

1. Compound Components
   - For complex, connected UI primitives (for example `Select`, `Modal`, `Accordion`, `Tabs`), default to the Compound Component pattern.
   - Expose a composable API surface (for example `Select`, `Select.Trigger`, `Select.Content`, `Select.Option`) instead of large prop bags.
   - Keep shared interaction state managed inside the compound root and exposed through context or controlled props when needed.
   - Avoid leaking low-level internal state responsibilities to parent consumers by default.

2. Container/Presentational Separation
   - Keep logic/data orchestration separated from rendering concerns.
   - Container components handle data fetching, mutations, derived state, and side effects.
   - Presentational components remain focused on UI markup and behavior, receiving typed props.
   - In Next.js, default Server Components to container roles (data loading/composition) and Client Components to interaction/view concerns.

3. Slots Pattern
   - Prefer slots over deep prop drilling for complex layouts and extensible component composition.
   - Accept UI regions through `children` and named slots (for example `header`, `actions`, `footer`, `emptyState`) to keep APIs flexible.
   - Use typed slot props so composition remains explicit and safe.

4. Higher-Order Components (HOCs)
   - Use HOCs only for broad cross-cutting concerns that wrap pages/views or large sections.
   - Suitable cases include auth guards, role checks, analytics instrumentation, and feature gating.
   - Do not use HOCs when hooks or composition patterns are more direct for localized concerns.

5. Styling and Variant Composition
   - For reusable components, define variants with CVA (`class-variance-authority`).
   - Always compose classes with `clsx` and resolve conflicts with `twMerge` through a shared `cn` helper.
   - Preserve user override capability by accepting `className` and merging it last.
   - Keep variants semantic and token-aligned (size, intent, tone, state), not one-off style flags.

## Implementation Checklist

- [ ] Complex primitives use compound component APIs
- [ ] Containers and presentational views are separated
- [ ] Slot-based composition is used instead of prop drilling
- [ ] HOCs are limited to cross-cutting concerns
- [ ] Reusable UI variants are defined with CVA and merged with `cn`

## Reference Snippet

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
  'inline-flex items-center rounded-md font-medium transition-colors',
  {
    variants: {
      intent: {
        neutral: 'bg-muted text-foreground',
        success: 'bg-green-100 text-green-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: {
      intent: 'neutral',
      size: 'md',
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, intent, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ intent, size }), className)}
      {...props}
    />
  );
}
```

## Additional Resources

- For concrete implementation patterns, see [examples.md](examples.md).
