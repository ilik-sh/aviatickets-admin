import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspend: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<div />}>
    <Element />
  </Suspense>
);

const SignInPage = React.lazy(() => import("app/auth/sign-in.page"));
const ChangePasswordPage = React.lazy(
  () => import("app/auth/change-password.page")
);
const ForgotPasswordPage = React.lazy(
  () => import("app/auth/forgot-password.page")
);
const ResetPasswordPage = React.lazy(
  () => import("app/auth/reset-password.page")
);
const NotFoundPage = React.lazy(() => import("app/auth/404.page"));
const VerificationPage = React.lazy(() => import("app/auth/verify.page"));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={"/signin"} element={<Suspend element={SignInPage} />} />

      <Route
        path={"/forgot"}
        element={<Suspend element={ForgotPasswordPage} />}
      />

      <Route
        path={"/verify"}
        element={<Suspend element={VerificationPage} />}
      />

      <Route
        path={"/reset"}
        element={<Suspend element={ResetPasswordPage} />}
      />

      <Route
        path={"/change"}
        element={<Suspend element={ChangePasswordPage} />}
      />

      <Route path={"/404"} element={<Suspend element={NotFoundPage} />} />

      <Route path="*" element={<Navigate to="/auth/signin" />} />
    </Routes>
  );
};

export default AuthRoutes;
