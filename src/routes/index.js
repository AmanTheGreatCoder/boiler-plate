import { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const MaintenanceError = Loadable(lazy(() => import('views/pages/maintenance/Error')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // return useRoutes([{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, MainRoutes]);
    return useRoutes([
        { path: '/', element: <Navigate to="/login" /> },
        AuthenticationRoutes,
        LoginRoutes,
        MainRoutes,
        { path: '*', element: <MaintenanceError />}
    ]);
}
