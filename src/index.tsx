import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './ErrorPage/ErrorPage';
import Page1 from './Page1';
import Page2 from './Page2';
import IndexPage from './IndexPage/IndexPage';

const getPosts = () => fetch('https://jsonplaceholder.typicode.com/users/1/posts').then((res) => res.json());

export async function loader() {
  const posts = await getPosts();
  return { posts };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexPage />, loader: loader },
      {
        path: "/1",
        element: <Page1 />,
      },
      {
        path: "/2",
        element: <Page2 />,
      },
    ],
  }
]);

const rootDiv =
  document.getElementById('root') ?? document.createElement('div');
const root = ReactDOM.createRoot(rootDiv);
root.render(
  <RouterProvider router={router} />
);
