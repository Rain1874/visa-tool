/*
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2025-01-10 17:05:03
 * @LastEditors: zhangxy
 * @LastEditTime: 2025-01-13 18:08:17
 */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const ErrorBoundary = lazy(() => import('../pages/errorBoundary'));
const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const isDevelopment = process.env.NODE_ENV === 'development';

const routes = [
  {
    path: '/login',
    element: <Login />,
    auth: false,
  },
  {
    path: isDevelopment ? '/' : '/dist/',
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
