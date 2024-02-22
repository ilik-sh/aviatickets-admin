import React, { useEffect } from "react";
import "./App.css";
import Booking from "./app/bookings/booking.page";
import ChatPage from "app/chat/chat.page";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { chatSelector } from "app/chat/store/chat.selector";
import {
  connectToSocket,
  disconnectFromSocket,
} from "app/chat/store/chat.actions";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "app.routes";
import ErrorBoundaryComp from "components/error-boundary.comp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme();

function App() {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(chatSelector);
  useEffect(() => {
    dispatch(connectToSocket());
    return () => {
      if (chat.connected === true) {
        dispatch(disconnectFromSocket());
      }
    };
  }, [dispatch]);

  return (
    <ErrorBoundaryComp>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={5000}
          style={{ fontSize: "16px" }}
        >
          <ThemeProvider theme={theme}>
            <Router>
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ErrorBoundaryComp>
  );
}

export default App;
