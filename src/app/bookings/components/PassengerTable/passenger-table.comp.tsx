import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { PassengerDto } from "aviatickets-submodule/libs/types/passenger.dto";

type Props = {
  passengers: PassengerDto[];
};

export default function PassengerTable({ passengers }: Props) {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Passengers
      </Typography>
      <Table size="small" aria-label="flights" sx={{ marginBottom: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengers.map((passenger) => (
            <TableRow key={passenger.id}>
              <TableCell component="th" scope="row">
                {passenger.firstName}
              </TableCell>
              <TableCell>{passenger.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
