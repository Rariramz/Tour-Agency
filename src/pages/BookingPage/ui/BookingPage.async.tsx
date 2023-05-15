import { lazy, Suspense } from 'react';

const BookingPage = lazy(() => import('./BookingPage'));

const BookingPageAsync = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BookingPage />
  </Suspense>
);

export { BookingPageAsync };
