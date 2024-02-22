import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";

export interface FlightDto extends UUIDDto {
  originCity: string;
  destinationCity: string;
  departureTime: number;
  arrivalTime: number;
  status: "Planned" | "Completed";
  price: number;
  seatAmount: number;
  availableSeatAmount: number;
}
