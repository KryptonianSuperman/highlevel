'use client';

import { useCallback, useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import type { Post } from '@/features/posts/models/post';
import { useGetPostsQuery } from '@/features/posts/services/posts.api';
import { PostFilters } from './post-filters';
import { createPostAction } from '@/app/posts/actions';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type Props = {
  initialPosts: Post[];
};

export function PostsList({ initialPosts }: Props): React.ReactElement {
  const [isPending, startTransition] = useTransition();
  const { data = initialPosts } = useGetPostsQuery();
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    data,
    (state, nextPost: Post) => [nextPost, ...state],
  );

  const handleCreate = useCallback(() => {
    const optimistic: Post = {
      id: Date.now(),
      title: 'Optimistic post',
      body: 'This appears before server confirmation.',
    };

    addOptimisticPost(optimistic);

    startTransition(async () => {
      await createPostAction({
        title: optimistic.title,
        body: optimistic.body,
      });
      toast.success('Post created');
    });
  }, [addOptimisticPost, startTransition]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <PostFilters />
        <Button onClick={handleCreate} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Post'}
        </Button>
      </div>
      <div className="grid gap-3">
        {optimisticPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-base">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
