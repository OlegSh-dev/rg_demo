import type { Post } from '../../types/post';
import { JSON_PLACEHOLDER_BASE_URL } from '../config';
import { parseJson, throwIfAborted } from '../utils/http';

export async function fetchPostById(id: number, signal?: AbortSignal): Promise<Post> {
  const response = await fetch(`${JSON_PLACEHOLDER_BASE_URL}/posts/${id}`, { signal });
  throwIfAborted(signal);
  const data = await parseJson<Post>(response);
  throwIfAborted(signal);
  return data;
}
