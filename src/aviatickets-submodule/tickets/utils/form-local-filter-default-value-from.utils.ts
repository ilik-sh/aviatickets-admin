import { TicketSearchFilter } from "aviatickets-submodule/ticket-search-filter/types/ticket-search-filter.type";
import dayjs from "dayjs";

interface FormDefaultValues {
  arrivalTime: any;
  departureTime: any;
  originCity: string;
  destinationCity: string;
  passengerAmount: number;
}

export const formLocalFilterDefaultValueFrom = (
  filter: TicketSearchFilter
): FormDefaultValues => {
  const { arrivalTime, departureTime } = filter;
  const transformedArrivalTime = {
    arrivalTime: arrivalTime ? dayjs(arrivalTime) : undefined,
  };
  const transformedDepartureTime = {
    departureTime: departureTime ? dayjs(departureTime) : undefined,
  };

  return {
    ...filter,
    ...transformedDepartureTime,
    ...transformedArrivalTime,
  };
};
