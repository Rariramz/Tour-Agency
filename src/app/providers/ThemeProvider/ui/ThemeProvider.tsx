import React, { useState, useMemo, FC, ReactNode } from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: any
}

const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;