import { useQuery } from '@tanstack/react-query';
import { postsQueryKeys } from '../config';
import { fetchPostById } from './fetch-post-by-id';

export function usePostQuery(postId: number | null) {
  return useQuery({
    queryKey:
      postId !== null
        ? postsQueryKeys.detail(postId)
        : (['posts', 'detail', 'idle'] as const),
    queryFn: ({ signal }) => {
      if (postId === null) {
        throw new Error('postId не задан');
      }
      return fetchPostById(postId, signal);
    },
    enabled: postId !== null,
  });
}
