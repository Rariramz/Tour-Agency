import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRouter } from './providers/RouterProvider';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};
