import { BookingDto } from "aviatickets-submodule/libs/types/booking.dto";

export interface BookingDataDto {
  count: number;
  bookings: BookingDto[];
}
