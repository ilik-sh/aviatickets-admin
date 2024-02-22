import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketClient } from "aviatickets-submodule/libs/socket/socket.client";
import { Provider } from "react-redux";
import store from "store";
import { SnackbarProvider } from "notistack";

export const socketClient = new SocketClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
