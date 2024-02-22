import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import repository from "aviatickets-submodule/libs/api/repository";
import { BookingsDto } from "aviatickets-submodule/libs/types/bookings.dto";
import { BookingDto } from "aviatickets-submodule/libs/types/booking.dto";
import { PaginationQueryDto } from "aviatickets-submodule/libs/types/pagination-query.dto";
import { UsersDto } from "aviatickets-submodule/libs/types/users.dto";
import { UpdateUserDto } from "../types/update-user.dto";
import { UserParamsDto } from "../types/user-params.dto";
import { UserDto } from "aviatickets-submodule/libs/types/user.dto";

export type CustomError = {
  message: string;
  statusCode: number;
};

export const getAllUsers = createAsyncThunk<
  UsersDto,
  { query: PaginationQueryDto },
  { rejectValue: CustomError }
>("users", async ({ query }, { rejectWithValue }) => {
  try {
    const response = await repository.get("/users", {
      params: { ...query },
    });
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError<CustomError>(error)) {
      console.log(error);
      return rejectWithValue(error.response?.data!);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as CustomError);
  }
});

export const updateUser = createAsyncThunk<
  UserDto,
  { params: UserParamsDto; body: UpdateUserDto },
  { rejectValue: CustomError }
>("users/updateUser", async ({ params, body }, { rejectWithValue }) => {
  try {
    const response = await repository.put(`/users/${params.id}`, body);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError<CustomError>(error)) {
      console.log(error);
      return rejectWithValue(error.response?.data!);
    }
    return rejectWithValue({
      message: "Unknown erorr",
      statusCode: 500,
    } as CustomError);
  }
});
