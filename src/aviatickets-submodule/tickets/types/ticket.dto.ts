import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";

export interface TicketDto extends UUIDDto {
  id: string;
  price: number;
  toDestinationRoute: RouteDto;
  toOriginRoute: RouteDto | null;
}

export interface RouteDto {
  originCity: string;
  destinationCity: string;
  travelTime: number;
  price: number;
  stops: number;
  arrivalTime: number;
  departureTime: number;
  flights: FlightDto[];
}

export interface FlightDto extends UUIDDto {
  originCity: string;
  destinationCity: string;
  departureTime: number;
  arrivalTime: number;
  flightTime: number;
  status: FlightStatuses;
  price: number;
  seatAmount: number;
  availableSeatAmount: number;
}

enum FlightStatuses {
  Planned = "planned",
  Completed = "completed",
}
