import { TicketDto } from "aviatickets-submodule/tickets/types/ticket.dto";

export type TicketDtoIdentifier = Pick<TicketDto, "id">["id"];
