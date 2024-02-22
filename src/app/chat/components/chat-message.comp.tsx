import React from "react";
import MessageForm from "app/chat/components/MessageInput/message-input.comp";
import MessageList from "app/chat/components/MessageList/message-list.comp";
import { styled, Stack } from "@mui/material";
import { useAppSelector } from "hooks/redux.hooks";
import { chatSelector } from "../store/chat.selector";

type Props = {};

export default function ChatMessage({}: Props) {
  const { selectedClient } = useAppSelector(chatSelector);
  return (
    <>
      <MessageList />
      <MessageForm />
    </>
  );
}
