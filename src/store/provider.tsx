'use client';

import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './index';

export function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const store = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
