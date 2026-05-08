import { Suspense } from 'react';
import { getPostsServer } from '@/features/posts/services/posts.server';
import { PostsList } from '@/features/posts/components/posts-list';
import { PostsListSkeleton } from '@/features/posts/components/posts-list.skeleton';
import { LocalErrorBoundary } from '@/shared/components/feedback/local-error-boundary';

export default async function PostsPage(): Promise<React.ReactElement> {
  const initialPosts = await getPostsServer();

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Posts</h1>
      <LocalErrorBoundary>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList initialPosts={initialPosts} />
        </Suspense>
      </LocalErrorBoundary>
    </main>
  );
}
