import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import { table } from "console";
import React from "react";
import { FlightDto } from "aviatickets-submodule/libs/types/flight.dto";
import dayjs from "dayjs";

type Props = {
  flights: FlightDto[];
  text: string;
};

export default function FlightTable({ flights, text }: Props) {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        {text}
      </Typography>
      <Table size="small" aria-label="flights" sx={{ marginBottom: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Origin city</TableCell>
            <TableCell>Destination city</TableCell>
            <TableCell>Departure</TableCell>
            <TableCell>Arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell component="th" scope="row">
                {flight.originCity}
              </TableCell>
              <TableCell>{flight.destinationCity}</TableCell>
              <TableCell>
                {dayjs(flight.departureTime).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>
                {dayjs(flight.arrivalTime).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
