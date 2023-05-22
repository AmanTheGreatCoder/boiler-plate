import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import Loadable from "ui-component/Loadable";

const NotFound = Loadable(lazy(() => import("views/pages/maintenance/Error")));

const MaintenanceLanding = Loadable(
  lazy(() => import("views/pages/maintenance/UnderMaintenance"))
);

export default function ThemeRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/login" /> },
    LoginRoutes,
    MainRoutes,
    { path: "/maintenance", element: <MaintenanceLanding /> },
    { path: "*", element: <NotFound /> },
  ]);
}
