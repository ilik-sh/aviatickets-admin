import { createSlice } from "@reduxjs/toolkit";
import { BookingsState } from "../types/bookings.state";
import { cancelBooking, getAllBookings } from "./bookings.actions";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";

const initialState: BookingsState = {
  count: 0,
  bookings: [],
  isPending: {
    count: false,
    bookings: false,
    update: false,
  },
  errors: {
    count: null,
    bookings: null,
    update: null,
  },
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state) => {
      state.isPending.count = true;
      state.isPending.bookings = true;
    });
    builder.addCase(getAllBookings.fulfilled, (state, { payload }) => {
      state.isPending.count = false;
      state.isPending.bookings = false;
      state.bookings = payload.bookings;
      state.count = payload.count;
    });
    builder.addCase(getAllBookings.rejected, (state, { payload }) => {
      state.isPending.count = false;
      state.isPending.bookings = false;
      const typedPayload = payload as ApiError;
      state.errors.count = typedPayload.message;
      state.errors.bookings = typedPayload.message;
    });
    builder.addCase(cancelBooking.pending, (state) => {
      state.isPending.update = true;
      state.errors.update = null;
    });
    builder.addCase(cancelBooking.fulfilled, (state, { payload }) => {
      state.isPending.update = false;
      state.errors.update = null;
      state.bookings = state.bookings.map((existing) => {
        return existing.id === payload.id ? payload : existing;
      });
    });
    builder.addCase(cancelBooking.rejected, (state, { payload }) => {
      state.isPending.update = false;
      const typedPayload = payload as ApiError;
      state.errors.update = typedPayload.message;
    });
  },
});

export default bookingsSlice.reducer;
