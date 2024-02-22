import { CircularProgress } from "@mui/material";
import React from "react";
import { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Element />
    </Suspense>
  );
};

const SearchTicketsPage = React.lazy(
  () => import("app/tickets/search-tickets.page")
);

const TicketsRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path={"/search"}
        element={<Suspended element={SearchTicketsPage} />}
      />
      <Route path="*" element={<Navigate to="/tickets/search" />} />
    </Routes>
  );
};

export default TicketsRoutes;
