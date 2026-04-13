import { clampPage } from '../../shared/utils/pagination';

export type PaginationItem =
  | { type: 'ellipsis'; side: 'start' | 'end' }
  | { type: 'page'; page: number };

export function getPaginationItems(
  current: number,
  maxPage: number,
  neighbors = 2,
): PaginationItem[] {
  if (maxPage < 1) {
    return [];
  }
  const cur = clampPage(current);
  const last = Math.floor(maxPage);
  const left = Math.max(1, cur - neighbors);
  const right = Math.min(last, cur + neighbors);
  const items: PaginationItem[] = [];

  if (left > 1) {
    items.push({ type: 'ellipsis', side: 'start' });
  }
  for (let p = left; p <= right; p++) {
    items.push({ type: 'page', page: p });
  }
  if (right < last) {
    items.push({ type: 'ellipsis', side: 'end' });
  }
  return items;
}
