import { UserDto } from "aviatickets-submodule/libs/types/user.dto";

export interface UsersDto {
  count: number;
  users: UserDto[];
}
