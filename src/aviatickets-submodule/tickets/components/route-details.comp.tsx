import {
  StackProps,
  styled,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import { FC } from "react";
import { parseTimeToString } from "aviatickets-submodule/libs/utils/parse-time-to-string.utils";
import { RouteDto } from "../types/ticket.dto";
import FlightDetails from "./flight-details.comp";

interface RouteDetailsProps {
  route: RouteDto;
  originCity: string;
  destinationCity: string;
}

const StyledRouteDetails = styled("div")((props) => ({
  width: "100%",
}));

const StyledStack = styled(Stack)<StackProps>((props) => ({
  alignItems: "center",
  rowGap: "20px",
  width: "100%",
}));

const StyledKeyRouteSpots = styled(Typography)<TypographyProps>((props) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
}));

const StyledFlightStack = styled(Stack)<StackProps>((props) => ({
  rowGap: "20px",
  width: "100%",

  "@media(max-width: 1000px)": {
    rowGap: "40px",
  },

  "@media(max-width: 500px)": {
    rowGap: "50px",
  },
}));

const RouteDetails: FC<RouteDetailsProps> = ({
  route,
  originCity,
  destinationCity,
}) => {
  const totalFlightTime = parseTimeToString(route.travelTime);

  return (
    <StyledRouteDetails>
      <StyledStack>
        <StyledKeyRouteSpots>
          {originCity} - {destinationCity} | {totalFlightTime}
        </StyledKeyRouteSpots>
        <StyledFlightStack>
          {route.flights.map((flight) => (
            <FlightDetails flight={flight} key={flight.id} />
          ))}
        </StyledFlightStack>
      </StyledStack>
    </StyledRouteDetails>
  );
};

export default RouteDetails;
