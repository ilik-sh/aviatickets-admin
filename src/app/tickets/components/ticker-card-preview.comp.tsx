import styled from "@emotion/styled";
import { FC } from "react";
import { TicketDto } from "../types/ticket.dto";
import TicketJourneyPreview from "./ticket-journey-preview.comp";

interface TicketCardPreviewProps {
  ticket: TicketDto;
}

const StyledTicketCard = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
  padding: '20px',
  width: '100%'
}));

const StyledTicketJourneys = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '30px',
}));

const StyledTicketPrice = styled('div')((props) => ({
  fontSize: '24px',
  alignSelf: 'center'
}));

const StyledDivider = styled('div')((props) => ({
  borderBottom: '1px solid lightgray'
}));

const TicketCardPreview: FC<TicketCardPreviewProps> = ({ ticket }) => {
  const { toDestinationRoute, toOriginRoute } = ticket;

  return (
    <StyledTicketCard>
      <StyledTicketJourneys>
        <TicketJourneyPreview route={toDestinationRoute} destinationCity={toDestinationRoute.destinationCity} originCity={toDestinationRoute.originCity} />
        {toOriginRoute &&
          <TicketJourneyPreview route={toOriginRoute} destinationCity={toOriginRoute.originCity} originCity={toOriginRoute.destinationCity} />
        }
      </StyledTicketJourneys>
      <StyledDivider />
      <StyledTicketPrice>${ticket.price}</StyledTicketPrice>
    </StyledTicketCard >
  );
}

export default TicketCardPreview;