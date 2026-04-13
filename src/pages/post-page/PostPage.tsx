import { useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { routes } from '../../services/routes';
import { parsePageParam } from '../../shared/utils/pagination';
import { parsePostId } from '../../shared/utils/post-id';
import { postsQueryKeys } from '../../services/config';
import { usePostQuery } from '../../services/post-by-id/use-post-query';
import { DirectionalPageTransition } from '../../shared/ui/directional-page-transition/DirectionalPageTransition';
import { TransitionLink } from '../../shared/ui/transition-link/TransitionLink';
import { PostDetailAsyncState } from './PostDetailAsyncState';
import styles from './PostPage.module.css';

export function PostPage() {
  const queryClient = useQueryClient();
  const { postId: postIdParam } = useParams<{ postId: string }>();
  const [searchParams] = useSearchParams();
  const postId = parsePostId(postIdParam);
  const fromPage = parsePageParam(searchParams.get(routes.query.fromPage));
  const { data: post, isPending, isError, error, refetch } = usePostQuery(postId);

  const backHref = routes.href.postsList(fromPage);

  if (postId === null) {
    return (
      <DirectionalPageTransition>
        <div className={styles.page}>
          <p className={styles.invalid}>Пост не найден.</p>
        </div>
      </DirectionalPageTransition>
    );
  }

  return (
    <DirectionalPageTransition>
      <div className={styles.page}>
        <TransitionLink
          to={backHref}
          transitionType="nav-back"
          className={styles.back}
          onBeforeNavigate={() => {
            void queryClient.cancelQueries({
              queryKey: postsQueryKeys.detail(postId),
            });
          }}
        >
          ← Назад к списку
        </TransitionLink>
        <PostDetailAsyncState
          isError={isError}
          isPending={isPending}
          error={error}
          post={post}
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    </DirectionalPageTransition>
  );
}
