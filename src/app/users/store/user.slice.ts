import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../types/users.state";
import { getAllUsers, updateUser } from "./users.actions";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";

const initialState: UsersState = {
  count: 0,
  users: [],
  isPending: {
    count: false,
    users: false,
    update: false,
  },
  errors: {
    count: null,
    users: null,
    update: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isPending.count = true;
      state.isPending.bookings = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.isPending.count = false;
      state.isPending.users = false;
      state.users = payload.users;
      state.count = payload.count;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.isPending.count = false;
      state.isPending.bookings = false;
      const typedPayload = payload as ApiError;
      state.errors.count = typedPayload.message;
      state.errors.bookings = typedPayload.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isPending.update = true;
      state.errors.update = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isPending.update = false;
      state.errors.update = null;
      state.users = state.users.map((existing) => {
        return existing.id === payload.id ? payload : existing;
      });
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isPending.update = false;
      const typedPayload = payload as ApiError;
      state.errors.update = typedPayload.message;
    });
  },
});

export default usersSlice.reducer;
