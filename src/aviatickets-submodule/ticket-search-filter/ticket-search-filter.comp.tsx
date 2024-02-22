import { Button, ButtonProps, Stack, StackProps, styled } from "@mui/material";
import { BaseSyntheticEvent, FC } from "react";
import Select from "./components/select.comp";
import { TicketSearchFilterYup } from "./validation-schemas/ticket-search-filter.schema";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { CitiesDto } from "aviatickets-submodule/cities/types/cities.dto";
import DatePicker from "./components/date-picker.comp";
import PassengerAmountInput from "./components/passenger-amount-input.comp";

interface TickerSearchFilterProps {
  cities: CitiesDto;
  onSearchButtonClick: (
    data: FieldValues,
    event?: BaseSyntheticEvent<object, any, any> | undefined
  ) => unknown;
  control: Control<TicketSearchFilterYup, any>;
  validationErrors: FieldErrors<TicketSearchFilterYup>;
}

const StyledStack = styled(Stack)<StackProps>(() => ({
  flexDirection: "row",
  flexWrap: "wrap",
  rowGap: "20px",
  justifyContent: "end",
}));

const StyledSearchButton = styled(Button)<ButtonProps>(() => ({
  flexGrow: 1,
  borderRadius: 0,
  minWidth: 150,
  maxWidth: 300,
  fontSize: "1.1rem",
  maxHeight: "56px",

  "@media(max-width: 500px)": {
    maxWidth: "100%",
  },
}));

const TickerSearchFilter: FC<TickerSearchFilterProps> = ({
  onSearchButtonClick,
  cities,
  control,
  validationErrors,
  ...props
}) => {
  const originCityHelperText = validationErrors.originCity
    ? `${validationErrors.originCity.message}`
    : "";
  const destinationCityHelperText = validationErrors.destinationCity
    ? `${validationErrors.destinationCity.message}`
    : "";
  const departureTimeHelperText = validationErrors.departureTime
    ? `${validationErrors.departureTime.message}`
    : "";
  const arrivalTimeHelperText = validationErrors.arrivalTime
    ? `${validationErrors.arrivalTime.message}`
    : "";
  const passengerAmountHelperText = validationErrors.passengerAmount
    ? `${validationErrors.passengerAmount.message}`
    : "";

  return (
    <div className="ticket-search-filter">
      <form
        className="ticket-search-filter__form form"
        onSubmit={onSearchButtonClick}
      >
        <StyledStack>
          <Select
            name="originCity"
            error={Boolean(validationErrors.originCity)}
            control={control}
            labelId="origin-city-label"
            id="origin-city-select"
            label="Origin city"
            selectValues={cities}
            helperText={originCityHelperText}
          />
          <Select
            name="destinationCity"
            error={Boolean(validationErrors.destinationCity)}
            control={control}
            labelId="destination-city-label"
            id="destination-city-select"
            label="Destination city"
            selectValues={cities}
            helperText={destinationCityHelperText}
          />
          <DatePicker
            name="departureTime"
            control={control}
            label="Departure date"
            error={Boolean(validationErrors.departureTime)}
            helperText={departureTimeHelperText}
          />
          <DatePicker
            name="arrivalTime"
            control={control}
            label="Arrival date"
            error={Boolean(validationErrors.arrivalTime)}
            helperText={arrivalTimeHelperText}
          />
          <PassengerAmountInput
            label="Passenger amount"
            control={control}
            name="passengerAmount"
            error={Boolean(validationErrors.passengerAmount)}
            helperText={passengerAmountHelperText}
          />
          <StyledSearchButton variant="contained" onClick={onSearchButtonClick}>
            Search
          </StyledSearchButton>
        </StyledStack>
      </form>
    </div>
  );
};

export default TickerSearchFilter;
