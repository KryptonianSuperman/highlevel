'use client';

import { Input } from '@/shared/components/ui/input';
import { usePostsFilters } from '@/features/posts/hooks/use-posts-filters';

export function PostFilters(): React.ReactElement {
  const { query, setQuery } = usePostsFilters();

  return (
    <div className="max-w-sm">
      <Input
        aria-label="Filter posts"
        placeholder="Search by title"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}
