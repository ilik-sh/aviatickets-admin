import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";

export interface PassengerDto extends UUIDDto {
  firstName: string;
  lastName: string;
  passportId: string;
}
