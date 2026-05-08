'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export async function createPostAction(
  input: unknown,
): Promise<{ success: true }> {
  CreatePostSchema.parse(input);
  revalidateTag('posts', 'max');
  return { success: true };
}
