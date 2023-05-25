import { lazy } from 'react';
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'utils/Loadable';

const AuthLogin = Loadable(lazy(() => import('pages/Authentication/Login')));
const AuthCodeVerification = Loadable(
  lazy(() => import('pages/Authentication/OTP'))
);

const LoginRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/otp-screen',
      element: <AuthCodeVerification />
    }
  ]
};

export default LoginRoutes;
