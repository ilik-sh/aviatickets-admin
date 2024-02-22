import { styled } from "@mui/material";
import { FC } from "react";
import { RouteDto } from "../types/ticket.dto";
import JourneySpot from "./journey-spot.comp";
import TravelDuration from "./travel-duration.comp";

interface TicketJourneyPreviewProps {
  route: RouteDto;
  destinationCity: string;
  originCity: string;
}

const StyledTicketJourneyPreview = styled('div')((props) => ({
  display: 'grid',
  gridTemplateColumns: "repeat(3, 33.3%)",
  justifyItems: 'center',
  gap: '20px',
  justifyContent: 'center',

  '@media(max-width: 800px)': {
    gridTemplateColumns: '1fr',
  }
}));

const TicketJourneyPreview: FC<TicketJourneyPreviewProps> = ({ route, originCity, destinationCity }) => {
  const { stops, travelTime } = route;
  return (
    <StyledTicketJourneyPreview>
      <JourneySpot time={route.departureTime} city={originCity} />
      <TravelDuration stopNumber={stops} travelTime={travelTime} />
      <JourneySpot time={route.arrivalTime} city={destinationCity} />
    </StyledTicketJourneyPreview >
  );
}

export default TicketJourneyPreview;