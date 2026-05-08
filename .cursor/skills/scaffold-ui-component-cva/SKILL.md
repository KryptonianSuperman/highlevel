---
name: scaffold-ui-component-cva
description: Executable skill for scaffolding a new scalable UI component using class-variance-authority (cva) and the cn utility (clsx + tailwind-merge). Use when instructed to create a new component, scaffold a UI element, or build a foundational UI block in TSX.
---

# Skill: Scaffold a New UI Component

## 🎯 Trigger

Execute this behavior when instructed to "create a new [Name] component," "scaffold a UI element," or build a foundational UI block.

## 📋 Execution Steps

1. **Initialize File:** Create the new component file (e.g., `[ComponentName].tsx`) in the requested or standard UI directory.
2. **Setup Imports:** Import `cva` and `VariantProps` from `class-variance-authority`, and the project's `cn` utility.
3. **Draft the `cva` Definition:**
   - Write the base string for classes that should _always_ apply (e.g., layout structure, base transitions, typography).
   - Construct the `variants` object based on the component's logical permutations (e.g., `intent`, `size`, `layout`).
   - Define strict `defaultVariants` so the component renders predictably without explicit props.
4. **Draft the Interface:** - Extend the appropriate standard React HTML attributes (e.g., `React.HTMLAttributes<HTMLDivElement>` or `React.ButtonHTMLAttributes<HTMLButtonElement>`).
   - Intersect the HTML attributes with `VariantProps<typeof [component]Variants>`.
5. **Construct the Component:**
   - Destructure the `className`, variant props, and `...props` in the component parameters.
   - Apply the classes using `className={cn([component]Variants({ [variantProp1], [variantProp2], className }))}`.
   - Spread `...props` onto the root element.
   - Ensure explicit `export function ComponentName` syntax is used rather than anonymous arrow functions for better debugging.

## 📝 Scaffold Template

When generating the file, adhere strictly to the following boilerplate structure:

<example>
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentNameVariants = cva(
// Base classes
"inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
{
variants: {
variant: {
default: "bg-primary text-primary-foreground hover:bg-primary/90",
secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
},
size: {
default: "h-10 px-4 py-2",
sm: "h-9 rounded-md px-3",
lg: "h-11 rounded-md px-8",
},
},
defaultVariants: {
variant: "default",
size: "default",
},
}
)

export interface ComponentNameProps
extends React.HTMLAttributes<HTMLDivElement>, // Change HTMLDivElement based on root node
VariantProps<typeof componentNameVariants> {}

export function ComponentName({
className,
variant,
size,
...props
}: ComponentNameProps) {
return (
<div
className={cn(componentNameVariants({ variant, size, className }))}
{...props} >
{/_ Component Content _/}
</div>
)
}
</example>
