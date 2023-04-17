import { RouteObject } from 'react-router-dom';
import { RootPage } from '../../../../pages/RootPage/index';
import { MainPage } from '../../../../pages/MainPage';
import { PlacesPage } from '../../../../pages/PlacesPage';
import { NotFoundPage } from '../../../../pages/NotFoundPage';
import { ErrorPage } from '../../../../pages/ErrorPage';
import { RoutePath } from '../../../../shared/config/route/route';

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: RoutePath.places,
        element: <PlacesPage />
      },
      {
        path: RoutePath.not_found,
        element: <NotFoundPage />
      }
    ]
  }
];
