import { BaseState } from "aviatickets-submodule/libs/types/base.state";
import { UserDto } from "aviatickets-submodule/libs/types/user.dto";

export interface UsersState extends BaseState {
  count: number;
  users: UserDto[];
}
