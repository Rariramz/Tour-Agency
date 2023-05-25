import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

const router = createBrowserRouter(routeConfig);

const AppRouterProvider = () => <RouterProvider router={router} />;

export default AppRouterProvider;
