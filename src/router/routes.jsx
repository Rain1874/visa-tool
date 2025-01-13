/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const ErrorBoundary = lazy(() => import('../pages/errorBoundary'));
const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));

const routes = [
  {
    path: '/login',
    element: <Login />,
    auth: false,
  },
  {
    path: '/',
    element: <Home />,
    auth: true,
    children: [],
  },
  {
    path: '/auth/home',
    element: <Home />,
    auth: true,
    children: [],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
    auth: true,
    children: [],
  },
];

export default routes;
