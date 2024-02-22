import { createAsyncThunk } from "@reduxjs/toolkit";
import { CitiesDto } from "aviatickets-submodule/cities/types/cities.dto";
import axios from "axios";

const REACT_APP_API_URL = "http://localhost:3001/api/v1";
export const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
});

export const getAllCities = createAsyncThunk<CitiesDto>(
  "GET/all-cities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${REACT_APP_API_URL}/cities`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
