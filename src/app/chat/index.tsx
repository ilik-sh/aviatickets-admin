import React from "react";
import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspended } from "aviatickets-submodule/libs/components/suspended.comp";

const ChatPage = React.lazy(() => import("./chat.page"));

const ChatRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/all"} element={<Suspended element={ChatPage} />} />
      <Route path="*" element={<Navigate to="/chat/all" />} />
    </Routes>
  );
};

export default ChatRoutes;
