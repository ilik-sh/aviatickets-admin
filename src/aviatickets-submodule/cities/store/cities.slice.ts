import { createSlice } from "@reduxjs/toolkit";
import { CitiesState } from "../types/cities.state";
import { getAllCities } from "./cities.actions";

const initialState: CitiesState = {
  cities: null,
  isPending: {
    cities: false,
  },
  errors: {
    cities: null,
  },
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCities.pending, (state) => {
        state.isPending.cities = true;
        state.errors.cities = null;
      })
      .addCase(getAllCities.fulfilled, (state, { payload }) => {
        state.isPending.cities = false;
        state.cities = payload;
      })
      .addCase(
        getAllCities.rejected,
        (state, action: any & { payload: any }) => {
          state.isPending.cities = false;
          state.errors.cities = action.payload.message;
        }
      );
  },
});
