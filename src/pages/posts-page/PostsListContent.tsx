import type { Post } from '../../types/post';
import { PostCard } from '../../components/post-card/PostCard';
import styles from './PostsPage.module.css';

type Props = {
  posts: Post[];
  page: number;
};

export function PostsListContent({ posts, page }: Props) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} listPage={page} />
        </li>
      ))}
    </ul>
  );
}
