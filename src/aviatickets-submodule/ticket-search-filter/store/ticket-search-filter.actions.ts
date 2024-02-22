import { createAction } from "@reduxjs/toolkit";
import { TicketSearchFilter } from "../types/ticket-search-filter.type";

export const updateFilter = createAction("filter/update", (filter: TicketSearchFilter) => {
  return { payload: filter };
});
