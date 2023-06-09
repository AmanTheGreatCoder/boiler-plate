import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import GuestGuard from 'utils/route-guard/GuestGuard';
import AuthLogin from 'pages/Authentication/Login';
import AuthCode from 'pages/Authentication/OTP';

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
      element: <AuthCode />
    }
  ]
};

export default LoginRoutes;
