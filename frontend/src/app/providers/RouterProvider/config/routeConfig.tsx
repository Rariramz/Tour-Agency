import { RouteObject } from 'react-router-dom';
import { RootPage } from '../../../../pages/RootPage/index';
import { HomePage } from '../../../../pages/HomePage';
import { ExplorePage } from '../../../../pages/ExplorePage';
import { NotFoundPage } from '../../../../pages/NotFoundPage';
import { ErrorPage } from '../../../../pages/ErrorPage';
import { BookingPage } from '../../../../pages/BookingPage';
import { AppRoutes, RoutePath } from '../../../../shared/config/route/route';
import { TourPage } from '../../../../pages/TourPage';
import { AuthorizationPage } from '../../../../pages/AuthorizationPage';
import { AdminPage } from '../../../../pages/AdminPage';

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath[AppRoutes.HOME],
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: RoutePath[AppRoutes.ADMIN],
        element: <AdminPage />,
      },
      {
        path: RoutePath[AppRoutes.AUTHORIZATION],
        element: <AuthorizationPage />,
      },
      {
        path: RoutePath[AppRoutes.EXPLORE],
        element: <ExplorePage />,
      },
      {
        path: `${RoutePath[AppRoutes.EXPLORE]}/:tourId`,
        element: <TourPage />,
      },
      {
        path: RoutePath[AppRoutes.BOOKING],
        element: <BookingPage />
      },
      {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />
      }
    ]
  }
];
