import { PAGE_SIZE } from '../shared/constants/pagination';

/** Базовый URL API демо (JSONPlaceholder). */
export const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com' as const;

/** Ключи TanStack Query для постов (согласованы с fetch в этом сервисном слое). */
export const postsQueryKeys = {
  all: ['posts'] as const,
  list: (page: number) => [...postsQueryKeys.all, 'list', page, PAGE_SIZE] as const,
  detail: (id: number) => [...postsQueryKeys.all, 'detail', id] as const,
};
