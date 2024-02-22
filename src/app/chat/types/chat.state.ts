import { Client } from "app/chat/types/client";
import { Message } from "aviatickets-submodule/libs/socket/types/message";

export type ChatState = {
  awaitingClients: Client[];
  connected: boolean;
  messages: Message[];
  selectedClient: Client | null;
};
