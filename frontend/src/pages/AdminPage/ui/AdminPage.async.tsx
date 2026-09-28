import { lazy, Suspense } from 'react';

const AdminPage = lazy(() => import('./AdminPage'));

const AdminPageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AdminPage />
  </Suspense>
);

export { AdminPageAsync };
