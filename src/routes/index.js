import { Navigate, useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import Maintenance from 'pages/ErrorManagement/Maintenance.jsx';
import NotFound from 'pages/ErrorManagement/NotFound';

export default function ThemeRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/login" /> },
    LoginRoutes,
    MainRoutes,
    { path: '/maintenance', element: <Maintenance /> },
    { path: '*', element: <NotFound /> }
  ]);
}
