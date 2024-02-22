import { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { LocalStorageKeys } from "aviatickets-submodule/libs/enums/local-storage-keys.enum";
import { useAppSelector } from "hooks/redux.hooks";
import CenteredLoader from "aviatickets-submodule/libs/components/centered-loader.comp";
import React from "react";
import {
  AuthModulePagePaths,
  BookingsModulePagePaths,
  ChatModulePagePaths,
  TicketsModulePagePaths,
} from "enums/page-paths.enum";
import { authSelector } from "app/auth/store/auth.selector";
import { Roles } from "aviatickets-submodule/libs/enums/roles.enum";

const SalesRoute: FC<{ element: any }> = ({ element: Element }) => {
  const { role } = useAppSelector(authSelector);
  return role == "Sales" ? (
    <Suspense fallback={<CenteredLoader />}>
      <Element />
    </Suspense>
  ) : (
    <Navigate to={AuthModulePagePaths.SignIn} />
  );
};

const AdminRoute: FC<{ element: any }> = ({ element: Element }) => {
  const { role } = useAppSelector(authSelector);
  return role == "Admin" ? (
    <Suspense fallback={<CenteredLoader />}>
      <Element />
    </Suspense>
  ) : (
    <Navigate to={AuthModulePagePaths.SignIn} />
  );
};

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<CenteredLoader />}>
    <Element />
  </Suspense>
);

const AuthRoutes = React.lazy(() => import("app/auth"));
const TicketsRoutes = React.lazy(() => import("app/tickets"));
const BookingsRoutes = React.lazy(() => import("app/bookings"));
const ChatRoutes = React.lazy(() => import("app/chat"));
const UsersRoutes = React.lazy(() => import("app/users"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />
      <Route path={"/users/*"} element={<AdminRoute element={UsersRoutes} />} />
      <Route
        path={"/bookings/*"}
        element={<AdminRoute element={BookingsRoutes} />}
      />
      <Route
        path={"/tickets/*"}
        element={<SalesRoute element={TicketsRoutes} />}
      />
      <Route path={"/chat/*"} element={<SalesRoute element={ChatRoutes} />} />
      <Route path="*" element={<Navigate to={AuthModulePagePaths.SignIn} />} />
    </Routes>
  );
};

export default AppRoutes;
