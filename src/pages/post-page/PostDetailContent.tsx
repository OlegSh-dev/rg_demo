import { ViewTransition, type ReactNode } from 'react';
import type { Post } from '../../types/post';
import styles from './PostPage.module.css';

type Props = {
  post: Post;
};

function ViewTransitionTitle({
  postId,
  children,
}: {
  postId: number;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={`post-title-${postId}`} share="text-morph" default="none">
      {children}
    </ViewTransition>
  );
}

export function PostDetailContent({ post }: Props) {
  return (
    <article className={styles.article}>
      <ViewTransitionTitle postId={post.id}>
        <h1 className={styles.postTitle}>{post.title}</h1>
      </ViewTransitionTitle>
      <p className={styles.meta}>Пост №{post.id}</p>
      <div className={styles.body}>{post.body}</div>
    </article>
  );
}
