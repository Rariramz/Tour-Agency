import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig';

const router = createBrowserRouter(routeConfig);

export default () => <RouterProvider router={router} />;