import { TicketSearchFilter } from "aviatickets-submodule/ticket-search-filter/types/ticket-search-filter.type";
import { TicketSearchFilterYup } from "aviatickets-submodule/ticket-search-filter/validation-schemas/ticket-search-filter.schema";

export const formTicketStoreFilterFrom = (
  localFilterState: TicketSearchFilterYup
): TicketSearchFilter => {
  const { arrivalTime, departureTime } = localFilterState;
  const transformedArrivalTime = {
    arrivalTime: arrivalTime ? new Date(arrivalTime).toISOString() : "",
  };
  const transformedDepartureTime = {
    departureTime: departureTime ? new Date(departureTime).toISOString() : "",
  };

  return {
    ...localFilterState,
    ...transformedDepartureTime,
    ...transformedArrivalTime,
  };
};
