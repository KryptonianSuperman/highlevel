import 'server-only';
import { PostsSchema, type Post } from '@/features/posts/models/post';
import { env } from '@/core/env/env';

export async function getPostsServer(): Promise<Post[]> {
  const response = await fetch(`${env.EXTERNAL_API_BASE_URL}/posts`, {
    next: { tags: ['posts'] },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const json: unknown = await response.json();
  return PostsSchema.parse(json);
}
