import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'utils/Loadable';

const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
const User = Loadable(lazy(() => import('pages/User/User')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/user',
      element: <User />
    }
  ]
};

export default MainRoutes;
