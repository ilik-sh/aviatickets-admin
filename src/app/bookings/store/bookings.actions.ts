import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import repository from "aviatickets-submodule/libs/api/repository";
import { BookingsDto } from "aviatickets-submodule/libs/types/bookings.dto";
import { BookingDto } from "aviatickets-submodule/libs/types/booking.dto";
import { PaginationQueryDto } from "aviatickets-submodule/libs/types/pagination-query.dto";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";

export const getAllBookings = createAsyncThunk<
  BookingsDto,
  { query: PaginationQueryDto },
  { rejectValue: ApiError }
>("bookings/getAllBookings", async ({ query }, { rejectWithValue }) => {
  try {
    const response = await repository.get("/bookings/", {
      params: { ...query },
    });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(error);
      return rejectWithValue(error.response?.data!);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as ApiError);
  }
});

export const cancelBooking = createAsyncThunk<
  BookingDto,
  { id: string },
  { rejectValue: ApiError }
>("bookings/cancelBooking", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await repository.put(`/bookings/${id}`, {
      status: "Cancelled",
    });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(error);
      return rejectWithValue(error.response?.data!);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as ApiError);
  }
});
