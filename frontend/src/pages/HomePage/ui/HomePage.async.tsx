import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./HomePage'));

const HomePageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePage />
  </Suspense>
);

export { HomePageAsync };
