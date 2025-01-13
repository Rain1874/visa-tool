import { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { RouterProvider, Routes, BrowserRouter } from 'react-router-dom';
import router from './router';
import { RouteAuthFun } from './router/authRouter';
import ReactDOM from 'react-dom/client';
import PageLoading from './pageLoading';
import Settings from './defaultSetting';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1890ff',
      },
    }}
  >
    <Suspense fallback={<PageLoading />}>
      {Settings.authLogin ? (
        <BrowserRouter>
          <Routes>{RouteAuthFun(router.routes)}</Routes>
        </BrowserRouter>
      ) : (
        <RouterProvider router={router} />
      )}
    </Suspense>
  </ConfigProvider>,
);
