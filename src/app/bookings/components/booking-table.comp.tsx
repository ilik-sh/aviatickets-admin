import React, { useEffect } from "react";
import {
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import { Row } from "./CollapseRow/collapse-row.comp";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { getAllBookings } from "../store/bookings.actions";
import { bookingsSelector } from "../store/bookings.selector";
import CenteredLoader from "aviatickets-submodule/libs/components/centered-loader.comp";
import Message from "aviatickets-submodule/libs/components/message.comp";
import NamesRow from "app/bookings/components//NamesRow/names-row.comp";

export default function BookingTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useAppDispatch();
  const { isPending, errors, bookings, count } =
    useAppSelector(bookingsSelector);

  useEffect(() => {
    const query = { pageNumber: currentPage, pageSize: pageSize };
    dispatch(getAllBookings({ query }));
  }, [dispatch, currentPage, pageSize]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1);
  };

  if (isPending.bookings) {
    return <CenteredLoader />;
  }

  if (errors.bookings) {
    return <Message title="Erorr ocurred" text={errors.bookings} />;
  }

  if (count === 0) {
    return <Message title="No bookings found" text="" />;
  }

  return (
    <Paper sx={{ padding: "20px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <NamesRow />
          </TableHead>
          <TableBody>
            {bookings.map((item, index) => (
              <Row key={index} row={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[10, 20]}
        page={currentPage - 1}
        onRowsPerPageChange={handlePageSizeChange}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
}
