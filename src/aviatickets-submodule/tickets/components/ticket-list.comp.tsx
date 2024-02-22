import { Pagination, Stack, StackProps, styled } from "@mui/material";
import CenteredLoader from "aviatickets-submodule/libs/components/centered-loader.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { calculatePageCount } from "aviatickets-submodule/libs/utils/calculate-page-count.utils";
import { ticketsSelector } from "../store/tickets.selectors";
import NoTickets from "./no-tickets.comp";
import TicketCards from "./ticket-cards.comp";
import TicketListError from "./ticket-list-error.comp";

const StyledTicketList = styled("section")((props) => ({}));

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: "50px",
  alignItems: "center",
}));

interface TicketListProps {
  pageSize: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const TicketList: FC<TicketListProps> = ({
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  const { isPending, tickets, count, errors } = useAppSelector(ticketsSelector);

  if (isPending.tickets) {
    return <CenteredLoader />;
  }

  if (errors.tickets) {
    return <TicketListError />;
  }

  if (count === null) {
    return (
      <NoTickets title="There is nothing here yet. Let's look for tickets" />
    );
  }

  if (count === 0) {
    return <NoTickets title="No tickets were found" />;
  }

  const pageCount = calculatePageCount(count, pageSize);

  const handleCurrentPageChange = (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <StyledTicketList>
      <StyledStack>
        <TicketCards tickets={tickets} />
        {pageCount > 1 && (
          <Pagination
            onChange={handleCurrentPageChange}
            page={currentPage}
            count={pageCount}
            size="large"
          />
        )}
      </StyledStack>
    </StyledTicketList>
  );
};

export default TicketList;
