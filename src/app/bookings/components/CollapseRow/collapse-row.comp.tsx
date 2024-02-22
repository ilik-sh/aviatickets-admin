import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Cancel,
} from "@mui/icons-material";
import PassengerTable from "../PassengerTable/passenger-table.comp";
import FlightTable from "../FlightTable/flight-table.comp";
import { red } from "@mui/material/colors";
import { stat } from "fs";
import { BookingDto } from "aviatickets-submodule/libs/types/booking.dto";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { cancelBooking } from "app/bookings/store/bookings.actions";
import { bookingsSelector } from "app/bookings/store/bookings.selector";
import { useSnackbar } from "notistack";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";

const statusColors = {
  Booked: "primary",
  Payed: "green",
  Cancelled: "error",
};

export function Row(props: { row: BookingDto }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { errors, isPending } = useAppSelector(bookingsSelector);
  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = async () => {
    const bookingId = { id: row.id };
    const response = await dispatch(cancelBooking(bookingId));
    console.log(response);
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Succesfully cancelled booking", { variant: "success" });
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user.id}
        </TableCell>
        <TableCell>
          {row.user.firstName} {row.user.lastName}
        </TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.originCity}</TableCell>
        <TableCell>{row.destinationCity}</TableCell>
        <TableCell>
          <Typography color={statusColors[row.status]}>{row.status}</Typography>
        </TableCell>
        <TableCell>
          {row.status == "Booked" ? (
            <Button
              onClick={handleCancel}
              variant="outlined"
              color="error"
              disabled={isPending.update}
            >
              {" "}
              Cancel
            </Button>
          ) : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.passengers ? (
                <PassengerTable passengers={row.passengers} />
              ) : null}
              {row.toDestinationRoute.length ? (
                <FlightTable
                  text="To Destination"
                  flights={row.toDestinationRoute}
                />
              ) : null}
              {row.toOriginRoute.length ? (
                <FlightTable text="To Origin" flights={row.toOriginRoute} />
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
