/**
 * Направление анимации при смене страницы списка (view transitions / навигация вперёд-назад).
 */
export type PageNavigationDirection = 'nav-forward' | 'nav-back';

/**
 * Определяет направление перехода между страницами пагинации для анимаций и history.
 *
 * @param currentPage — текущая страница (1-based)
 * @param targetPage — целевая страница (1-based)
 * @returns `'nav-forward'`, если целевая страница больше текущей, иначе `'nav-back'`
 */
export function directionForPageNavigation(
  currentPage: number,
  targetPage: number,
): PageNavigationDirection {
  return targetPage > currentPage ? 'nav-forward' : 'nav-back';
}
