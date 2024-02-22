import React from "react";
import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspended } from "aviatickets-submodule/libs/components/suspended.comp";

const UsersPage = React.lazy(() => import("./users.page"));

const UsersRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/all"} element={<Suspended element={UsersPage} />} />
      <Route path="*" element={<Navigate to="/bookings/all" />} />
    </Routes>
  );
};

export default UsersRoutes;
