import { styled } from "@mui/material";
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { TicketSearchFilterYup } from "../validation-schemas/ticket-search-filter.schema";

interface DatePickerProps extends MuiDatePickerProps<Date> {
  label: string;
  control: Control<TicketSearchFilterYup, any>;
  name: "departureTime" | "arrivalTime";
  error: boolean;
  helperText: string;
}

const StyledDatePicker = styled(MuiDatePicker)<MuiDatePickerProps<Date>>(() => ({
  minWidth: 170,
  flexGrow: 1
}));

const DatePicker: FC<DatePickerProps> = ({ name, control, label, error, helperText }) => {
  return (
    <Controller control={control} name={name} render={({ field }) => (
      <StyledDatePicker
        {...field}
        label={label}
        disablePast={true}
        value={field.value ?? null}
        slotProps={{ textField: { error, helperText } }}
      />
    )} />
  );
}

export default DatePicker;