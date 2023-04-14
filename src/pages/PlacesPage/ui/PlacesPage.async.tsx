import { lazy } from 'react';

export const PlacesPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./PlacesPage')), 1500);
}));