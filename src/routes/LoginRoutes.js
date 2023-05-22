import { lazy } from "react";
import GuestGuard from "utils/route-guard/GuestGuard";
import MinimalLayout from "layout/MinimalLayout";
import NavMotion from "layout/NavMotion";
import Loadable from "ui-component/Loadable";

const AuthLogin = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);
const AuthCodeVerification = Loadable(
  lazy(() =>
    import("views/pages/authentication/authentication3/CodeVerification3")
  )
);

const LoginRoutes = {
  path: "/",
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: "/login",
      element: <AuthLogin />,
    },
    {
      path: "/otp-screen",
      element: <AuthCodeVerification />,
    },
  ],
};

export default LoginRoutes;
