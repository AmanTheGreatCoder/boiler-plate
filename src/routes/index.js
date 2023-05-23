import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import Loadable from "utils/Loadable";

const NotFound = Loadable(lazy(() => import("pages/maintenance/404")));

const MaintenanceLanding = Loadable(
  lazy(() => import("pages/maintenance/UnderMaintenance"))
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
