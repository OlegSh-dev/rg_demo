import { useQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '../../shared/constants/pagination';
import { postsQueryKeys } from '../config';
import { fetchPostsPage } from './fetch-posts-page';

export function usePostsListQuery(page: number) {
  return useQuery({
    queryKey: postsQueryKeys.list(page),
    queryFn: ({ signal }) => fetchPostsPage(page, PAGE_SIZE, signal),
  });
}
