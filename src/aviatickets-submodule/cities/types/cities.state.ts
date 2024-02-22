import { BaseState } from "aviatickets-submodule/libs/types/base.state";
import { CitiesDto } from "./cities.dto";

export interface CitiesState extends BaseState {
  cities: CitiesDto | null;
  isPending: {
    cities: boolean;
  };
  errors: {
    cities: string | null;
  };
}
