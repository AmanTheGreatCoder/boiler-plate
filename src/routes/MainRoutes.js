import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'utils/Loadable';

const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
const Country = Loadable(lazy(() => import('pages/Country')));
const City = Loadable(lazy(() => import('pages/City/City')));
const Subscription = Loadable(
  lazy(() => import('pages/Subscription/Subscription'))
);
const User = Loadable(lazy(() => import('pages/User/User')));
const UserSub = Loadable(lazy(() => import('pages/UserSubscription')));
const SIPExtensions = Loadable(
  lazy(() => import('pages/SIPExtensions/SIPExtensions'))
);
const PhoneNumber = Loadable(
  lazy(() => import('pages/PhoneNumber/PhoneNumber'))
);
const Provider = Loadable(lazy(() => import('pages/Provider/Provider')));
const RateList = Loadable(lazy(() => import('pages/RateList/RateList')));

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
      path: '/country',
      element: <Country />
    },
    {
      path: '/city',
      element: <City />
    },
    {
      path: '/phone-number',
      element: <PhoneNumber />
    },
    {
      path: '/subscription',
      element: <Subscription />
    },
    {
      path: '/system-config',
      element: <SIPExtensions />
    },
    {
      path: '/provider',
      element: <Provider />
    },
    {
      path: '/rate-list/:type/:parentId/:providerName',
      element: <RateList />
    },
    {
      path: '/user',
      element: <User />
    },
    {
      path: '/user-subscription',
      element: <UserSub />
    }
  ]
};

export default MainRoutes;
