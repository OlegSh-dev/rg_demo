import { generatePath } from 'react-router-dom';

/**
 * Единое описание маршрутов: сегменты для `<Route />`, имена query и сборка URL.
 * Ссылки и `navigate()` собирать через {@link routes.href} / {@link routePatterns}, не дублировать строки.
 *
 * Подход: `generatePath` для path-параметров (как в React Router docs), `URLSearchParams` для query.
 */

/** Имена query-параметров в URL (единый источник литералов для поиска и сборки строк). */
export const routeQuery = {
  /** Номер страницы списка постов (`?page=`). */
  page: 'page',
  /** Страница списка, с которой открыли пост (`?fromPage=`) — для возврата «назад» к той же странице. */
  fromPage: 'fromPage',
} as const;

/**
 * Относительные сегменты path, как в `<Route path="…">` внутри родителя с `path="/"`.
 */
export const routeSegments = {
  /** Список постов (без query). */
  posts: 'posts',
  /** Карточка поста с динамическим `:postId`. */
  postById: 'posts/:postId',
} as const;

/**
 * Абсолютные шаблоны путей от корня приложения (для `generatePath` и согласования с `<Route path>`).
 */
export const routePatterns = {
  /** Список постов: `/posts`. */
  postsList: '/posts',
  /** Пост по id: `/posts/:postId`. */
  postById: '/posts/:postId',
} as const;

/**
 * Сериализует query для страницы списка: только параметр {@link routeQuery.page}.
 *
 * @param page — номер страницы (1-based)
 * @returns строка вида `page=2` без ведущего `?`
 */
function postsListSearch(page: number): string {
  return new URLSearchParams({
    [routeQuery.page]: String(page),
  }).toString();
}

/**
 * Сериализует query для страницы поста: параметр {@link routeQuery.fromPage}.
 *
 * @param fromPage — номер страницы списка, с которой перешли к посту
 * @returns строка вида `fromPage=3` без ведущего `?`
 */
function postSearch(fromPage: number): string {
  return new URLSearchParams({
    [routeQuery.fromPage]: String(fromPage),
  }).toString();
}

/**
 * Полный относительный URL списка постов с указанной страницей пагинации.
 *
 * @param page — номер страницы списка
 * @returns путь с query, например `/posts?page=2`
 */
function hrefPostsList(page: number): string {
  return `${routePatterns.postsList}?${postsListSearch(page)}`;
}

/**
 * Полный относительный URL страницы поста; в query передаётся исходная страница списка.
 *
 * @param postId — идентификатор поста (подставляется в {@link routePatterns.postById})
 * @param fromPage — страница списка для {@link postSearch}
 * @returns путь с query, например `/posts/5?fromPage=1`
 */
function hrefPost(postId: number, fromPage: number): string {
  const path = generatePath(routePatterns.postById, {
    postId: String(postId),
  });
  return `${path}?${postSearch(fromPage)}`;
}

/**
 * Публичный фасад маршрутизации: константы и готовые `href` для `<Link>` и `navigate()`.
 */
export const routes = {
  /** Имена query-параметров; то же, что {@link routeQuery}. */
  query: routeQuery,
  /** Относительные сегменты; то же, что {@link routeSegments}. */
  segments: routeSegments,
  /** Абсолютные шаблоны путей; то же, что {@link routePatterns}. */
  patterns: routePatterns,
  /**
   * Сборка строк навигации (относительные URL с path и query).
   */
  href: {
    /**
     * Список постов на заданной странице пагинации.
     *
     * @param page — номер страницы (1-based)
     */
    postsList: hrefPostsList,
    /**
     * Страница одного поста с сохранением контекста страницы списка в query.
     *
     * @param postId — id поста
     * @param fromPage — страница списка, с которой выполнен переход
     */
    post: hrefPost,
    /**
     * Эквивалент первой страницы списка (редирект с главной и т.п.).
     *
     * @returns тот же результат, что `href.postsList(1)`
     */
    postsFirstPage: (): string => hrefPostsList(1),
  },
} as const;
