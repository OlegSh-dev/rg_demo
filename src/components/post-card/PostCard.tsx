import { memo, ViewTransition } from 'react';
import { routes } from '../../services/routes';
import type { Post } from '../../types/post';
import { TransitionLink } from '../../shared/ui/transition-link/TransitionLink';
import styles from './PostCard.module.css';

type Props = {
  post: Post;
  listPage: number;
};

export const PostCard = memo(function PostCard({ post, listPage }: Props) {
  const href = routes.href.post(post.id, listPage);

  return (
    <TransitionLink
      to={href}
      transitionType="nav-forward"
      className={styles.card}
    >
      <ViewTransition name={`post-title-${post.id}`} share="text-morph" default="none">
        <h2 className={styles.title}>{post.title}</h2>
      </ViewTransition>
      <p className={styles.excerpt}>{post.body}</p>
    </TransitionLink>
  );
});
