import { useRef } from 'react';
import { ViewTransition } from 'react';
import type { Post } from '../../types/post';
import { PostsListSkeleton } from '../../shared/ui/posts-list-skeleton/PostsListSkeleton';
import { QueryLoadError } from '../../shared/ui/query-load-error/QueryLoadError';
import { PostsListContent } from './PostsListContent';
import styles from './PostsPage.module.css';

type Props = {
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  showListSkeleton: boolean;
  posts: Post[] | undefined;
  page: number;
};

export function PostsListAsyncState({
  isError,
  error,
  onRetry,
  showListSkeleton,
  posts,
  page,
}: Props) {
  /** См. `detailWasSkeletonRef` в PostDetailAsyncState — то же для списка. */
  const listWasSkeletonRef = useRef(false);

  if (isError) {
    return (
      <QueryLoadError
        error={error}
        onRetry={onRetry}
        fallbackMessage="Не удалось загрузить посты."
      />
    );
  }

  if (showListSkeleton) {
    listWasSkeletonRef.current = true;
    return (
      <ViewTransition exit="slide-down" default="none">
        <div className={styles.listSkeletonWrap}>
          <span className={styles.visuallyHidden}>
            Загрузка списка постов…
          </span>
          <PostsListSkeleton />
        </div>
      </ViewTransition>
    );
  }

  if (posts !== undefined) {
    const useSlideUpEnter = listWasSkeletonRef.current;
    listWasSkeletonRef.current = false;

    return (
      <ViewTransition
        enter={useSlideUpEnter ? 'slide-up' : 'none'}
        default="none"
      >
        <PostsListContent posts={posts} page={page} />
      </ViewTransition>
    );
  }

  return null;
}
