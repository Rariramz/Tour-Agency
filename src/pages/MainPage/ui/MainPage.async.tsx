import { lazy, Suspense } from 'react';

const MainPage = lazy(() => import('./MainPage'));

const MainPageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MainPage />
  </Suspense>
);

export { MainPageAsync };
