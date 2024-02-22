import React from "react";
import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspended } from "aviatickets-submodule/libs/components/suspended.comp";

const BookingsPage = React.lazy(() => import("./booking.page"));

const BookingsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/all"} element={<Suspended element={BookingsPage} />} />
      <Route path="*" element={<Navigate to="/bookings/all" />} />
    </Routes>
  );
};

export default BookingsRoutes;
