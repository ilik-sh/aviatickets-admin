import { createSlice } from "@reduxjs/toolkit";
import { TicketSearchFilterState } from "../types/ticket-search-filter.state";
import { TicketSearchFilter } from "../types/ticket-search-filter.type";
import { updateFilter } from "./ticket-search-filter.actions";

const filterInitialValue: TicketSearchFilter = {
  originCity: "",
  destinationCity: "",
  departureTime: "",
  arrivalTime: "",
  passengerAmount: 1,
};

const initialState: TicketSearchFilterState = {
  filter: filterInitialValue,
};

export const ticketSearchFilterSlice = createSlice({
  name: "ticketSearchFilter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateFilter, (state, { payload }) => {
      state.filter = payload;
    });
  },
});
