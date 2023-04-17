import { lazy, Suspense } from 'react';

const PlacesPage = lazy(() => import('./PlacesPage'));

const PlacesPageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PlacesPage />
  </Suspense>
);

export { PlacesPageAsync };
