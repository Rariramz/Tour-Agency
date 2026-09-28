import { lazy, Suspense } from 'react';

const ExplorePage = lazy(() => import('./ExplorePage'));

const ExplorePageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ExplorePage />
  </Suspense>
);

export { ExplorePageAsync };
