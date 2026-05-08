import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ReduxProvider } from '@/store/provider';
import { UiProvider } from '@/shared/contexts/ui-context';

function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ReduxProvider>
      <UiProvider>{children}</UiProvider>
    </ReduxProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: Providers, ...options });
}
