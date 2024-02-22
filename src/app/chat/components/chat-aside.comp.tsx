import { styled } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import UserList from "app/chat/components/UserList/user-list.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { chatSelector } from "../store/chat.selector";

type Props = {};

const Container = styled("div")({
  flex: "0.2 0 auto",
  maxHeight: "100%",
  overflow: "auto",
  minWidth: "0",
  gridArea: "aside",
  borderRight: "1px solid #ededed",
});

export default function ChatAside({}: Props) {
  const { awaitingClients } = useAppSelector(chatSelector);
  return (
    <Container>
      <UserList clients={awaitingClients} />
    </Container>
  );
}
