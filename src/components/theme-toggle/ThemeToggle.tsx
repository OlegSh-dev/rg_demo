import { useTheme } from '../../hooks/use-theme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему';

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className={styles.icon} aria-hidden>
        {theme === 'light' ? '◐' : '◑'}
      </span>
    </button>
  );
}
