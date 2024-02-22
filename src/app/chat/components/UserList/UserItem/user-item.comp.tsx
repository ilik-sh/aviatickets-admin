import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material";
import { Client } from "app/chat/types/client";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { saveSelectedClient } from "app/chat/store/chat.slice";
import { chatSelector } from "app/chat/store/chat.selector";
import { joinConversation } from "app/chat/store/chat.actions";

type Props = { client: Client };

const Box = styled("div")({
  borderRadius: "10px",
  padding: "20px",
  "&:hover": {
    backgroundColor: "#f0f0f5",
  },
});

export default function UserItem({ client }: Props) {
  const { selectedClient } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(saveSelectedClient({ client }));
    dispatch(joinConversation(client.id));
  };
  return (
    <Box
      style={
        selectedClient?.id == client.id
          ? {
              backgroundColor: "#f0f0f5",
            }
          : {}
      }
      onClick={handleClick}
    >
      <Typography>{client.name}</Typography>
    </Box>
  );
}
