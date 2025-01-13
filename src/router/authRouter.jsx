import { matchRoutes, useLocation, useNavigate, Route } from 'react-router-dom';
import { message } from 'antd';
import { useEffect } from 'react';
import useUserStore from '@/store';
import routes from './routes';

const AuthRouter = ({ children, auth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo.access_token || '';
  console.log('userInfo',userInfo)
  const { loginState } = useUserStore((state) => ({ loginState: state.userInfo.loginState }));
  const mathchs = matchRoutes(routes, location);
  const isExist = mathchs?.some((item) => item.pathname == location.pathname);

  useEffect(() => {
    if (!token && auth) {
      message.error('token过期，请重新登录!');
      navigate('/login');
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist && loginState) {
      navigate(location.pathname);
    }
  }, [token, location.pathname, auth, isExist, loginState, navigate]);

  return children;
};

const RouteAuthFun = (routeList) => {
  console.log('routeList',routeList)
  return routeList.map((item) => (
    <Route
      path={item.path}
      element={
        <AuthRouter auth={item.auth} key={item.path}>
          {item.element}
          123
        </AuthRouter>
      }
      key={item.path}
    >
      {/* 递归调用，因为可能存在多级的路由 */}
      {item?.children && RouteAuthFun(item.children)}
    </Route>
  ));
};

export { RouteAuthFun };
