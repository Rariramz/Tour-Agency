import { useState, useMemo, FC } from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: string | JSX.Element | JSX.Element[];
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
