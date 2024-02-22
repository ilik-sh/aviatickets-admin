import { UserDto } from "aviatickets-submodule/libs/types/user.dto";
import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";
import { FlightDto } from "./flight.dto";
import { PassengerDto } from "./passenger.dto";

export interface BookingDto extends UUIDDto {
  status: "Payed" | "Booked" | "Cancelled";
  price: number;
  user: UserDto;
  toDestinationRoute: FlightDto[];
  toOriginRoute: FlightDto[];
  passengers: PassengerDto[];
  originCity: string;
  destinationCity: string;
}
