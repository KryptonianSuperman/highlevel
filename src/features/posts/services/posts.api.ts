import { api } from '@/services/api';
import { PostsSchema, type Post } from '@/features/posts/models/post';

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/external/posts',
      transformResponse: (response: unknown) => PostsSchema.parse(response),
      providesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
