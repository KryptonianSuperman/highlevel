'use client';

import { Button } from '@/shared/components/ui/button';

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl p-6 space-y-4">
      <p className="text-red-600">{error.message}</p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
