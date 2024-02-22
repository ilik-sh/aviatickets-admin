import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, StackProps } from "@mui/material";
import { getAllCities } from "aviatickets-submodule/cities/store/cities.actions";
import { citiesSelector } from "aviatickets-submodule/cities/store/cities.selectors";
import { updateFilter } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.actions";
import { tickerSearchFilterSelector } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.selectors";
import TickerSearchFilter from "aviatickets-submodule/ticket-search-filter/ticket-search-filter.comp";
import {
  TicketSearchFilterYup,
  ticketSearchFilterSchema,
} from "aviatickets-submodule/ticket-search-filter/validation-schemas/ticket-search-filter.schema";
import CenteredLoader from "aviatickets-submodule/libs/components/centered-loader.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { getAllTickets } from "../store/tickets.actions";
import { formLocalFilterDefaultValueFrom } from "../utils/form-local-filter-default-value-from.utils";
import { formGetAllTicketsQueryFrom } from "../utils/form-get-all-tickets-query-from.utils";
import { formTicketStoreFilterFrom } from "../utils/form-ticket-store-filter-from.utils";
import SearchTicketsErrorPage from "./search-tickets-page-error.comp";
import TicketList from "./ticket-list.comp";

const PAGE_SIZE = 20;

const StyledStack = styled(Stack)<StackProps>((props) => ({
  rowGap: "50px",
}));

const SearchTicketsContent = () => {
  const dispatch = useAppDispatch();
  const [hasSearchButtonBeenClicked, setHasSearchButtonBeenClicked] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { filter } = useAppSelector(tickerSearchFilterSelector);
  const { cities, isPending, errors } = useAppSelector(citiesSelector);

  const {
    control,
    formState: { errors: validationErrors },
    trigger,
    getValues,
  } = useForm<TicketSearchFilterYup>({
    mode: "all",
    resolver: yupResolver(ticketSearchFilterSchema),
    defaultValues: formLocalFilterDefaultValueFrom(filter),
  });

  const handleSearchButtonClick: SubmitHandler<FieldValues> = async () => {
    const areFilterValuesValid = await trigger([
      "arrivalTime",
      "departureTime",
      "destinationCity",
      "originCity",
      "passengerAmount",
    ]);
    if (!areFilterValuesValid) {
      return;
    }

    setCurrentPage(1);
    setHasSearchButtonBeenClicked(true);

    const localFilterState = getValues();
    const paginationOptions = { pageSize: PAGE_SIZE, pageNumber: currentPage };
    const query = formGetAllTicketsQueryFrom(
      localFilterState,
      paginationOptions
    );

    dispatch(getAllTickets({ query }));

    const filter = formTicketStoreFilterFrom(localFilterState);
    dispatch(updateFilter(filter));
  };

  const handleCurrentPageClick = async () => {
    const areFilterValuesValid = await trigger([
      "arrivalTime",
      "departureTime",
      "destinationCity",
      "originCity",
      "passengerAmount",
    ]);
    if (!areFilterValuesValid) {
      return;
    }

    const localFilterState = getValues();
    const paginationOptions = { pageSize: PAGE_SIZE, pageNumber: currentPage };
    const query = formGetAllTicketsQueryFrom(
      localFilterState,
      paginationOptions
    );

    dispatch(getAllTickets({ query }));

    const filter = formTicketStoreFilterFrom(localFilterState);
    dispatch(updateFilter(filter));
  };

  useEffect(() => {
    if (!hasSearchButtonBeenClicked) {
      return;
    }

    handleCurrentPageClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (cities === null) {
      dispatch(getAllCities());
    }
  }, [dispatch, cities]);

  if (isPending.cities) {
    return <CenteredLoader />;
  }

  if (errors.cities) {
    return <SearchTicketsErrorPage />;
  }

  if (!cities) {
    return null;
  }

  return (
    <StyledStack>
      <TickerSearchFilter
        onSearchButtonClick={handleSearchButtonClick}
        cities={cities}
        control={control}
        validationErrors={validationErrors}
      />
      <TicketList
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </StyledStack>
  );
};

export default SearchTicketsContent;
