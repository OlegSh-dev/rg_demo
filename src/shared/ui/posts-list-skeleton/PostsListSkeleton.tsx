import styles from './PostsListSkeleton.module.css';

export function PostsListSkeleton() {
  return (
    <ul className={styles.list} aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i} className={styles.item}>
          <div className={styles.lineTitle} />
          <div className={styles.lineBody} />
          <div className={styles.lineBodyShort} />
        </li>
      ))}
    </ul>
  );
}
