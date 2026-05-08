'use client';

import { useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
