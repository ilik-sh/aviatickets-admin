import { BaseState } from "aviatickets-submodule/libs/types/base.state";
import { TicketDto } from "./ticket.dto";

export interface TicketState extends BaseState {
  count: number | null;
  tickets: TicketDto[];
  isPending: {
    count: boolean;
    tickets: boolean;
  };
  errors: {
    count: string | null;
    tickets: string | null;
  };
}
