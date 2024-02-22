import { ChatState } from "app/chat/types/chat.state";
import { createSlice } from "@reduxjs/toolkit";
import {
  connectToSocket,
  disconnectFromSocket,
  recieveMessage,
} from "app/chat/store/chat.actions";

const initialState: ChatState = {
  awaitingClients: [],
  connected: false,
  messages: [],
  selectedClient: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveSelectedClient(state, { payload }) {
      state.selectedClient = payload.client;
    },
    addAwaitingClient(state, { payload }) {
      state.awaitingClients.push(payload.awaitingClient);
    },
    removeAwaitingClient(state, { payload }) {
      state.awaitingClients = state.awaitingClients.filter(
        (client) => client.id != payload.id
      );
      state.selectedClient =
        payload.id == state.selectedClient?.id ? null : state.selectedClient;
    },
    saveMessages(state, { payload }) {
      state.messages = payload.messages;
    },
    saveRecievedMessage(state, { payload }) {
      state.messages.push(payload.message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToSocket.fulfilled, (state) => {
      state.connected = true;
    });
    builder.addCase(connectToSocket.rejected, (state) => {
      state.connected = false;
    });
    builder.addCase(connectToSocket.pending, (state) => {
      state.connected = false;
      state.messages = [];
      state.selectedClient = null;
      state.awaitingClients = [];
    });
    builder.addCase(disconnectFromSocket.fulfilled, (state) => {
      state.connected = false;
    });
    builder.addCase(disconnectFromSocket.rejected, (state) => {
      state.connected = true;
    });
    builder.addCase(disconnectFromSocket.pending, (state) => {
      state.connected = true;
    });
  },
});

export const { saveSelectedClient, addAwaitingClient, removeAwaitingClient } =
  chatSlice.actions;

export default chatSlice.reducer;
