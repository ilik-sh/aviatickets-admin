import { FormControl, FormControlProps, styled, TextField } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { KeysWithValuesOfType } from "../types/keys-with-values-of-type.type";
import { TicketSearchFilterYup } from "../validation-schemas/ticket-search-filter.schema";

interface PassengerAmountCounterProps {
  label: string;
  control: Control<TicketSearchFilterYup, any>;
  name: KeysWithValuesOfType<TicketSearchFilterYup, number>;
  helperText: string;
  error: boolean;
}

const StyledFormControl = styled(FormControl)<FormControlProps>(() => ({
  minWidth: 170,
  flex: '1 1 20%',
  maxWidth: '300px',

  '@media(max-width: 500px)': {
    maxWidth: '100%',
  },
}));

const PassengerAmountInput: FC<PassengerAmountCounterProps> = ({ label, control, name, helperText, error, ...props }) => {
  return (
    <StyledFormControl>
      <Controller control={control} name={name} render={({ field }) => (
        <TextField {...field} error={error} helperText={helperText} label={label} />
      )}
      />
    </StyledFormControl >
  )
}

export default PassengerAmountInput;
