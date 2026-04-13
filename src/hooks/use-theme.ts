import { useContext } from 'react';
import { ThemeContext } from '../app/theme-context';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme должен вызываться внутри ThemeProvider');
  }
  return ctx;
}
