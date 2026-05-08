# Examples

## 1) Compound Component: Select

```tsx
'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type SelectContextValue = {
  value: string | null;
  setValue: (next: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext(): SelectContextValue {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'Select compound components must be used within <Select.Root>',
    );
  }
  return context;
}

type SelectRootProps = {
  defaultValue?: string | null;
  children: React.ReactNode;
};

function SelectRoot({ defaultValue = null, children }: SelectRootProps) {
  const [value, setValue] = useState<string | null>(defaultValue);
  const contextValue = useMemo(() => ({ value, setValue }), [value]);
  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className }: { className?: string }) {
  const { value } = useSelectContext();
  return (
    <button
      className={cn('rounded-md border px-3 py-2 text-left', className)}
      type="button"
    >
      {value ?? 'Choose an option'}
    </button>
  );
}

type SelectOptionProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

function SelectOption({
  value: optionValue,
  children,
  className,
}: SelectOptionProps) {
  const { value, setValue } = useSelectContext();
  const selected = value === optionValue;

  return (
    <button
      type="button"
      onClick={() => setValue(optionValue)}
      className={cn(
        'block w-full rounded px-3 py-2 text-left',
        selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
        className,
      )}
    >
      {children}
    </button>
  );
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 space-y-1 rounded-md border p-1">{children}</div>;
}

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption,
};
```

Usage:

```tsx
<Select.Root defaultValue="apple">
  <Select.Trigger />
  <Select.Content>
    <Select.Option value="apple">Apple</Select.Option>
    <Select.Option value="orange">Orange</Select.Option>
  </Select.Content>
</Select.Root>
```

## 2) Slots Pattern: Composable Dashboard Shell

```tsx
type DashboardShellProps = {
  header: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function DashboardShell({
  header,
  filters,
  actions,
  children,
  sidebar,
}: DashboardShellProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[240px_1fr]">
      {sidebar ? (
        <aside className="rounded-md border p-4">{sidebar}</aside>
      ) : null}
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">{header}</div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </header>
        {filters ? (
          <div className="rounded-md border p-3">{filters}</div>
        ) : null}
        <main>{children}</main>
      </div>
    </section>
  );
}
```

Usage:

```tsx
<DashboardShell
  header={<h1 className="text-xl font-semibold">Revenue</h1>}
  actions={<button className="rounded-md border px-3 py-2">Export</button>}
  filters={<RevenueFilters />}
  sidebar={<SavedViews />}
>
  <RevenueChart />
</DashboardShell>
```

## 3) HOC for Cross-Cutting Concern: Auth Guard

```tsx
import { redirect } from 'next/navigation';

type User = {
  id: string;
  role: 'admin' | 'member';
};

type GuardOptions = {
  requiredRole?: User['role'];
  redirectTo?: string;
};

async function getCurrentUser(): Promise<User | null> {
  // Replace with real auth lookup.
  return null;
}

export function withAuthGuard<P>(
  WrappedComponent: (props: P) => Promise<JSX.Element> | JSX.Element,
  options: GuardOptions = {},
) {
  const { requiredRole, redirectTo = '/login' } = options;

  return async function GuardedComponent(props: P): Promise<JSX.Element> {
    const user = await getCurrentUser();
    if (!user) {
      redirect(redirectTo);
    }

    if (requiredRole && user.role !== requiredRole) {
      redirect('/forbidden');
    }

    return <WrappedComponent {...props} />;
  };
}
```

Usage:

```tsx
const AdminReportsPage = withAuthGuard(ReportsPage, { requiredRole: 'admin' });
export default AdminReportsPage;
```
