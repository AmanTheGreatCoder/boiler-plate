import { lazy } from "react";
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);
const Country = Loadable(lazy(() => import("views/pages/Country")));
const City = Loadable(lazy(() => import("views/pages/City/City")));
const Subscription = Loadable(
  lazy(() => import("views/pages/Subscription/Subscription"))
);
const User = Loadable(lazy(() => import("views/pages/User/User")));
const SIPExtensions = Loadable(
  lazy(() => import("views/pages/SIPExtensions/SIPExtensions"))
);
const PhoneNumber = Loadable(
  lazy(() => import("views/pages/PhoneNumber/PhoneNumber"))
);
const Provider = Loadable(lazy(() => import("views/pages/Provider/Provider")));
const RateList = Loadable(lazy(() => import("views/pages/RateList/RateList")));

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "/country",
      element: <Country />,
    },
    {
      path: "/city",
      element: <City />,
    },
    {
      path: "/phone-number",
      element: <PhoneNumber />,
    },
    {
      path: "/subscription",
      element: <Subscription />,
    },
    {
      path: "/system-config",
      element: <SIPExtensions />,
    },
    {
      path: "/provider",
      element: <Provider />,
    },
    {
      path: "/rate-list/:type/:parentId/:providerName",
      element: <RateList />,
    },
    {
      path: "/user",
      element: <User />,
    },
  ],
};

export default MainRoutes;
