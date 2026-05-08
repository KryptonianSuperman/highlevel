import { Skeleton } from '@/shared/components/ui/skeleton';

export function SkeletonCard(): React.ReactElement {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
