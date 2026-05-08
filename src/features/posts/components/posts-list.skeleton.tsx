import { SkeletonCard } from '@/shared/components/feedback/skeleton-card';

export function PostsListSkeleton(): React.ReactElement {
  return (
    <div className="space-y-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
