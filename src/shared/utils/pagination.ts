import { MAX_PAGE } from '../constants/pagination';

/**
 * Приводит номер страницы к допустимому диапазону: не меньше 1 и не больше {@link MAX_PAGE}.
 * Нецелые значения усекаются вниз.
 *
 * @param page — сырой номер страницы
 * @returns валидный номер страницы для UI и запросов
 */
export function clampPage(page: number): number {
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }
  if (page > MAX_PAGE) {
    return MAX_PAGE;
  }
  return Math.floor(page);
}

/**
 * Разбирает значение query-параметра страницы (например из URLSearchParams).
 * Пустая строка, `null` и нечисловые значения трактуются как первая страница.
 *
 * @param raw — строка из `?page=` или `null`, если параметра нет
 * @returns номер страницы после {@link clampPage}
 */
export function parsePageParam(raw: string | null): number {
  if (raw === null || raw === '') {
    return 1;
  }
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) {
    return 1;
  }
  return clampPage(n);
}
