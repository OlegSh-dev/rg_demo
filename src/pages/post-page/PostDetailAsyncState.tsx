import { useRef } from 'react';
import { ViewTransition } from 'react';
import type { Post } from '../../types/post';
import { PostDetailSkeleton } from '../../shared/ui/post-detail-skeleton/PostDetailSkeleton';
import { QueryLoadError } from '../../shared/ui/query-load-error/QueryLoadError';
import { PostDetailContent } from './PostDetailContent';

type Props = {
  isError: boolean;
  isPending: boolean;
  error: unknown;
  post: Post | undefined;
  onRetry: () => void;
};

export function PostDetailAsyncState({
  isError,
  isPending,
  error,
  post,
  onRetry,
}: Props) {
  /**
   * slide-up только после скелетона. Из кэша без скелетона — enter none, иначе slide-up на весь
   * контент бьётся с shared morph заголовка (мигание в конце). Это не заменяет fade-nav навигации.
   */
  const detailWasSkeletonRef = useRef(false);

  if (isError) {
    return (
      <QueryLoadError
        error={error}
        onRetry={onRetry}
        fallbackMessage="Не удалось загрузить пост."
      />
    );
  }

  if (isPending) {
    detailWasSkeletonRef.current = true;
    return (
      <ViewTransition exit="slide-down" default="none">
        <PostDetailSkeleton />
      </ViewTransition>
    );
  }

  if (post !== undefined) {
    const useSlideUpEnter = detailWasSkeletonRef.current;
    detailWasSkeletonRef.current = false;

    return (
      <ViewTransition
        enter={useSlideUpEnter ? 'slide-up' : 'none'}
        default="none"
      >
        <PostDetailContent post={post} />
      </ViewTransition>
    );
  }

  return null;
}
