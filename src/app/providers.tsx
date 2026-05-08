'use client';

import { useEffect } from 'react';
import { ReduxProvider } from '@/store/provider';
import { UiProvider } from '@/shared/contexts/ui-context';
import { Toaster } from '@/shared/components/ui/sonner';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/core/mocks/init').then(({ initializeBrowserMocks }) =>
        initializeBrowserMocks(),
      );
    }
  }, []);

  return (
    <ReduxProvider>
      <UiProvider>
        {children}
        <Toaster richColors position="top-right" />
      </UiProvider>
    </ReduxProvider>
  );
}
