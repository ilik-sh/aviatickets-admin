import { styled, List, ListItem } from "@mui/material";
import React, { useEffect } from "react";
import MessageItem from "app/chat/components/MessageList/MessageItem/message-item.comp";
import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { useAppSelector } from "hooks/redux.hooks";
import { chatSelector } from "app/chat/store/chat.selector";

type Props = {};

const Container = styled("div")({
  display: "flex",
  overflowY: "scroll",
  overflowX: "hidden",
  width: "100%",
  gridArea: "list",
});

const CustomList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "1em 1em",
  width: "100%",
  margin: "0 auto",
  maxWidth: "80%",
});

export default function MessageList({}: Props) {
  const { messages } = useAppSelector(chatSelector);
  return (
    <Container>
      <CustomList>
        {messages.map((message, index) => (
          <MessageItem message={message} key={index} />
        ))}
      </CustomList>
    </Container>
  );
}
