import { StackProps, styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { Stack } from "@mui/system";
import { FC, MouseEventHandler } from "react";
import { TicketDtoIdentifier } from "aviatickets-submodule/libs/types/dto-identifiers.type";
import { TicketDto } from "../types/ticket.dto";
import RouteDetails from "./route-details.comp";
import { useAppSelector } from "hooks/redux.hooks";
// import { authSelector } from "aviatickets-submodule/auth/store/auth.selector";

interface TicketDetailsProps {
  ticket: TicketDto;
  onSelectTicketBtnClick?: (
    ticketId: TicketDtoIdentifier
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
}

const StyledTicketDetails = styled("div")((props) => ({}));
const StyledStack = styled(Stack)<StackProps>((props) => ({
  flexDirection: "column",
  alignItems: "center",
  columnGap: "30px",
  rowGap: "40px",
}));

const StyledSelectTicketButton = styled(Button)<ButtonProps>((props) => ({
  fontSize: "1rem",
  maxWidth: "100px",
  width: "100%",
}));

const TicketDetails: FC<TicketDetailsProps> = ({
  ticket,
  onSelectTicketBtnClick,
}) => {
  const { toDestinationRoute, toOriginRoute } = ticket;

  return (
    <StyledTicketDetails>
      <StyledStack>
        <RouteDetails
          route={toDestinationRoute}
          originCity={toDestinationRoute.originCity}
          destinationCity={toDestinationRoute.destinationCity}
        />
        {toOriginRoute && (
          <RouteDetails
            route={toOriginRoute}
            originCity={toOriginRoute.destinationCity}
            destinationCity={toOriginRoute.originCity}
          />
        )}
        {onSelectTicketBtnClick && (
          <StyledSelectTicketButton
            onClick={onSelectTicketBtnClick(ticket.id)}
            variant="contained"
          >
            Select
          </StyledSelectTicketButton>
        )}
      </StyledStack>
    </StyledTicketDetails>
  );
};

export default TicketDetails;
