import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "app/chat/store/chat.slice";
import { bookingsSlice } from "./app/bookings/store/bookings.slice";
import { ticketsSlice } from "app/tickets/store/tickets.slice";
import { ticketSearchFilterSlice } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.slice";
import { citiesSlice } from "aviatickets-submodule/cities/store/cities.slice";
import { authSlice } from "app/auth/store/auth.slice";
import { usersSlice } from "app/users/store/user.slice";

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    bookings: bookingsSlice.reducer,
    tickets: ticketsSlice.reducer,
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
    cities: citiesSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
