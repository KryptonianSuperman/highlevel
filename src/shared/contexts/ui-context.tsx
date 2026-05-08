'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type UiContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: (next: boolean) => void;
};

const UiContext = createContext<UiContextValue | undefined>(undefined);

export function UiProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const value = useMemo(() => ({ sidebarOpen, setSidebarOpen }), [sidebarOpen]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUiContext(): UiContextValue {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUiContext must be used inside UiProvider');
  }

  return context;
}
