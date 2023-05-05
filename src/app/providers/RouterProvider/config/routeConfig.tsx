import { RouteObject } from 'react-router-dom';
import { RootPage } from '../../../../pages/RootPage/index';
import { MainPage } from '../../../../pages/MainPage';
import { ExplorePage } from '../../../../pages/ExplorePage';
import { NotFoundPage } from '../../../../pages/NotFoundPage';
import { ErrorPage } from '../../../../pages/ErrorPage';
import { AppRoutes, RoutePath } from '../../../../shared/config/route/route';

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath[AppRoutes.HOME],
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: RoutePath[AppRoutes.EXPLORE],
        element: <ExplorePage />
      },
      {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />
      }
    ]
  }
];
