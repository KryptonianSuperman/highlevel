import { SkeletonCard } from '@/shared/components/feedback/skeleton-card';

export default function RootLoading(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <SkeletonCard />
    </main>
  );
}
