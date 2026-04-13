import type { Post } from '../../types/post';
import { JSON_PLACEHOLDER_BASE_URL } from '../config';
import { parseJson, throwIfAborted } from '../utils/http';

export async function fetchPostsPage(
  page: number,
  pageSize: number,
  signal?: AbortSignal,
): Promise<Post[]> {
  const start = (page - 1) * pageSize;
  const response = await fetch(
    `${JSON_PLACEHOLDER_BASE_URL}/posts?_start=${start}&_limit=${pageSize}`,
    { signal },
  );
  throwIfAborted(signal);
  const data = await parseJson<Post[]>(response);
  throwIfAborted(signal);
  return data;
}
