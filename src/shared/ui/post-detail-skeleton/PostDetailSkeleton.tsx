import styles from './PostDetailSkeleton.module.css';

export function PostDetailSkeleton() {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.title} />
      <div className={styles.meta} />
      <div className={styles.para} />
      <div className={styles.para} />
      <div className={styles.paraShort} />
    </div>
  );
}
