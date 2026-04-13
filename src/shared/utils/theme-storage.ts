import type { Theme } from '../../types/theme';

/** Ключ в `localStorage` для сохранённой темы приложения. */
export const THEME_STORAGE_KEY = 'rg_demo_theme';

/**
 * Читает тему из `localStorage`. При недоступном хранилище или невалидном значении возвращает `null`.
 *
 * @returns сохранённая `'light'` / `'dark'` или `null`, если брать из системы/дефолта
 */
export function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'light' || raw === 'dark') {
      return raw;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Текущая предпочитаемая тема ОС по `prefers-color-scheme` (светлая или тёмная).
 *
 * @returns `'dark'`, если выбрана тёмная схема, иначе `'light'`
 */
export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
