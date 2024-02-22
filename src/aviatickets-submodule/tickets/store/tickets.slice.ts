import { createSlice } from "@reduxjs/toolkit";
import { TicketState } from "../types/tickets.state";
import { getAllTickets } from "./tickets.actions";

const initialState: TicketState = {
  count: null,
  tickets: [],
  isPending: {
    count: false,
    tickets: false,
  },
  errors: {
    count: null,
    tickets: null,
  },
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.isPending.tickets = true;
        state.isPending.count = true;
        state.errors.tickets = null;
        state.errors.count = null;
      })
      .addCase(getAllTickets.fulfilled, (state, { payload }) => {
        state.isPending.tickets = false;
        state.isPending.count = false;
        state.tickets = payload.tickets;
        state.count = payload.count;
      })
      .addCase(getAllTickets.rejected, (state, action: any & { payload: any }) => {
        state.isPending.tickets = false;
        state.isPending.count = false;
        state.errors.tickets = action.payload.message;
        state.errors.count = action.payload.message;
      });
  },
});
