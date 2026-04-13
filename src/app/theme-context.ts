import { createContext } from 'react';
import type { Theme } from '../types/theme';

export type { Theme };

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
