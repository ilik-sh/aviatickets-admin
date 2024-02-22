import React from "react";
import BookingTable from "./components/booking-table.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { bookingsSelector } from "app/bookings/store/bookings.selector";
import Layout from "components/layout.comp";
import Header from "components/header.comp";

type Props = {};

export default function Booking({}: Props) {
  return (
    <>
      <Header />
      <Layout>
        <BookingTable />
      </Layout>
    </>
  );
}
