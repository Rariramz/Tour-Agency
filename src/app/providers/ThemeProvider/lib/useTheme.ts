/* eslint-disable indent */
import { Theme, ThemeContext, ThemeContextProps } from './ThemeContext';
import { useContext } from 'react';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContext);

  let newTheme: Theme;
  const toggleTheme = () => {
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
    }
    setTheme?.(newTheme);
  };

  return { toggleTheme, theme: Theme.LIGHT };
}
