import React from "react";
import UserItem from "app/chat/components/UserList/UserItem/user-item.comp";
import { Paper, styled, List } from "@mui/material";
import { Client } from "app/chat/types/client";

type Props = {
  clients: Client[];
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flex: "0.8",
});

export default function UserList({ clients }: Props) {
  return (
    <List>
      {clients.map((client, index) => (
        <UserItem client={client} key={index} />
      ))}
    </List>
  );
}
