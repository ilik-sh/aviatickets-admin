import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllTicketsQueryDto } from "../types/get-all-tickets-query.dto";
import { TicketsDto } from "../types/tickets.dto";
import axios from "axios";

const REACT_APP_API_URL = "http://localhost:3001/api/v1";
export const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
});

export const getAllTickets = createAsyncThunk<TicketsDto, { query: Partial<GetAllTicketsQueryDto> }>(
  "GET/all-tickets",
  async ({ query = {} }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${REACT_APP_API_URL}/tickets`, {
        params: {
          ...query,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
