import { lazy, Suspense } from 'react';

const AuthorizationPage = lazy(() => import('./AuthorizationPage'));

const AuthorizationPageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthorizationPage />
  </Suspense>
);

export { AuthorizationPageAsync };
