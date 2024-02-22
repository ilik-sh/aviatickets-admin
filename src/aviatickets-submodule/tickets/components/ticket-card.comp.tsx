import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionSummary,
  AccordionSummaryProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { FC, MouseEventHandler } from "react";
import { TicketDto } from "../types/ticket.dto";
import TicketDetails from "./ticket-details.comp";
import { AccordionProps } from "@mui/material/Accordion";
import TicketCardPreview from "./ticker-card-preview.comp";
import { TicketDtoIdentifier } from "aviatickets-submodule/libs/types/dto-identifiers.type";

interface TicketCardProps {
  ticket: TicketDto;
  onSelectTicketBtnClick?: (
    ticketId: TicketDtoIdentifier
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
}

const StyledAccordion = styled(Accordion)<AccordionProps>((props) => ({
  border: "1px solid lightgray",
  boxShadow: "none",
  borderRadius: "16px",
}));

const StyledAccordionSummary = styled(AccordionSummary)<AccordionSummaryProps>(
  (props) => ({
    borderBottom: "1px solid lightgray",
    borderRadius: "16px",
  })
);

const StyledAccordionDetails = styled(AccordionDetails)<AccordionDetailsProps>(
  (props) => ({
    paddingBottom: "40px",
    paddingTop: "40px",
  })
);

const TicketCard: FC<TicketCardProps> = ({
  ticket,
  onSelectTicketBtnClick,
}) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} id={ticket.id}>
        <TicketCardPreview ticket={ticket} />
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <TicketDetails
          ticket={ticket}
          onSelectTicketBtnClick={onSelectTicketBtnClick}
        />
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default TicketCard;
