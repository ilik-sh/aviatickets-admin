import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";
import { BookingDataDto } from "aviatickets-submodule/libs/types/booking-data.dto";

export interface UserDto extends UUIDDto {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  roleType: string;
  bookingData?: BookingDataDto;
}
