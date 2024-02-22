import { Roles } from "aviatickets-submodule/libs/enums/roles.enum";
import { UserDto } from "aviatickets-submodule/libs/types/user.dto";

export interface AuthDto {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
