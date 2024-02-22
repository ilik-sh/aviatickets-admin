import { PassengerDto } from "aviatickets-submodule/libs/types/passenger.dto";
import { FlightDto } from "aviatickets-submodule/libs/types/flight.dto";
import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";

export interface BookingItemDto extends UUIDDto {
  price: number;
  passenger: PassengerDto;
  flight: FlightDto;
}
