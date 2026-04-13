import { useState, useTransition, addTransitionType } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from '../../services/routes';
import { parsePageParam } from '../../shared/utils/pagination';
import type { PageNavigationDirection } from '../../shared/utils/navigation';
import { usePostsListQuery } from '../../services/posts-list/use-posts-list-query';
import { DirectionalPageTransition } from '../../shared/ui/directional-page-transition/DirectionalPageTransition';
import { Pagination } from '../../components/pagination/Pagination';
import { PostsListAsyncState } from './PostsListAsyncState';
import styles from './PostsPage.module.css';

export function PostsPage() {
  const navigate = useNavigate();
  const [isPageTransitionPending, startPageTransition] = useTransition();
  const [searchParams] = useSearchParams();
  const page = parsePageParam(searchParams.get(routes.query.page));
  const [optimisticPage, setOptimisticPage] = useState<number | null>(null);
  const { data: posts, isPending, isError, error, refetch, isFetching } =
    usePostsListQuery(page);

  const displayPage =
    isPageTransitionPending && optimisticPage !== null
      ? optimisticPage
      : page;

  const handlePageNavigate = (
    targetPage: number,
    direction: PageNavigationDirection,
  ) => {
    setOptimisticPage(targetPage);
    startPageTransition(() => {
      addTransitionType(direction);
      navigate(routes.href.postsList(targetPage));
    });
  };

  const listRegionBusy =
    isPageTransitionPending || isFetching || (posts === undefined && !isError);
  const urlLagsBehindOptimisticPage =
    isPageTransitionPending &&
    optimisticPage !== null &&
    optimisticPage !== page;
  /** Не показываем список постов, пока нет данных для текущего URL или URL ещё не догнал оптимистичную пагинацию — без кликов по «чужим» постам. */
  const showListSkeleton =
    !isError &&
    (urlLagsBehindOptimisticPage ||
      (posts === undefined && (isPending || isFetching)));

  return (
    <DirectionalPageTransition>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Список постов</h1>
          <p className={styles.subtitle}>JSONPlaceholder · 10 на страницу</p>
        </header>
        <div
          className={styles.listRegion}
          aria-busy={listRegionBusy}
          aria-live="polite"
        >
          <PostsListAsyncState
            isError={isError}
            error={error}
            onRetry={() => {
              void refetch();
            }}
            showListSkeleton={showListSkeleton}
            posts={posts}
            page={page}
          />
        </div>
        <Pagination
          currentPage={displayPage}
          onGoToPage={handlePageNavigate}
          isNavigating={isPageTransitionPending}
        />
      </div>
    </DirectionalPageTransition>
  );
}
