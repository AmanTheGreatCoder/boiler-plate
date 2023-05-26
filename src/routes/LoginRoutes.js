import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import { lazy } from 'react';
import Loadable from 'utils/Loadable';

const AuthLogin = Loadable(lazy(() => import('pages/Authentication/Login')));

const LoginRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <MinimalLayout />
    </NavMotion>
  ),
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
