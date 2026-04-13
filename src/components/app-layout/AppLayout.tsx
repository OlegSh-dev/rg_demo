import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <header
        className={styles.header}
        style={{ viewTransitionName: 'site-header' }}
      >
        <div className={styles.headerInner}>
          <span className={styles.brand}>Демонстрация для РГ</span>
          <ThemeToggle />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
