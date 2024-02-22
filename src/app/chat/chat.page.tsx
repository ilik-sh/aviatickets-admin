import React, { useEffect } from "react";
import ChatAside from "./components/chat-aside.comp";
import ChatMessage from "./components/chat-message.comp";
import ChatInput from "./components/MessageInput/message-input.comp";
import { styled, Stack } from "@mui/material";
import Header from "components/header.comp";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import {
  getMessageHistory,
  recieveMessage,
  removeAwaitingClient,
  addAwaitingClient,
  connectToSocket,
  disconnectFromSocket,
} from "./store/chat.actions";
import { chatSelector } from "./store/chat.selector";

type Props = {};

const MainStack = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateAreas: `'aside list'
  'aside form'`,
  gridTemplateColumns: "1fr 4fr",
  gridTemplateRows: "4fr 0.5fr",
  height: "calc(100dvh - 64px)",
}));

export default function ChatPage({}: Props) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(chatSelector);
  useEffect(() => {
    dispatch(connectToSocket());
    return () => {
      if (chat.connected === true) {
        dispatch(disconnectFromSocket());
      }
    };
  }, []);
  useEffect(() => {
    dispatch(getMessageHistory());
    dispatch(recieveMessage());
    dispatch(removeAwaitingClient());
    dispatch(addAwaitingClient());
  }, []);
  return (
    <>
      <Header />
      <MainStack>
        <ChatAside />
        {chat.selectedClient ? <ChatMessage /> : null}
      </MainStack>
    </>
  );
}
