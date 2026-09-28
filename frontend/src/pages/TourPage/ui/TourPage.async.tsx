import { lazy, Suspense } from 'react';

const TourPage = lazy(() => import('./TourPage'));

const TourPageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TourPage />
  </Suspense>
);

export { TourPageAsync };
