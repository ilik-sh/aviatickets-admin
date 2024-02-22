import { TicketDto } from "./ticket.dto";

export interface TicketsDto {
  count: number;
  tickets: TicketDto[];
}
