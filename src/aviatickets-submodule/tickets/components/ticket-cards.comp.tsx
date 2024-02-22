import { Stack, StackProps, styled } from "@mui/material";
import { BookingsModulePagePaths } from "enums/page-paths.enum";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TicketDtoIdentifier } from "aviatickets-submodule/libs/types/dto-identifiers.type";
import { TicketDto } from "../types/ticket.dto";
import TicketCard from "./ticket-card.comp";

interface TicketCardsProps {
  tickets: TicketDto[];
}

const StyledTicketCards = styled(Stack)<StackProps>((props) => ({
  width: "100%",
  rowGap: "40px",
}));

const TicketCards: FC<TicketCardsProps> = ({ tickets }) => {
  const navigate = useNavigate();

  const handleSelectTicketBtnClick = (ticketId: TicketDtoIdentifier) => () => {
    // navigate(BookingsModulePagePaths.CreateBooking + ticketId);
  };

  return (
    <StyledTicketCards>
      {tickets.map((ticket) => {
        return (
          <TicketCard
            ticket={ticket}
            key={ticket.id}
            onSelectTicketBtnClick={handleSelectTicketBtnClick}
          />
        );
      })}
    </StyledTicketCards>
  );
};

export default TicketCards;
