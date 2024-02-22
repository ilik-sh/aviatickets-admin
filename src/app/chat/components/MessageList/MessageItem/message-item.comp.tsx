import { styled } from "@mui/material";
import { Typography } from "@mui/material";
import { authSelector } from "app/auth/store/auth.selector";
import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { useAppSelector } from "hooks/redux.hooks";
import React from "react";

type Props = { message: Message };

const Container = styled("div")({
  backgroundColor: "#42a5f5",
  padding: "5px",
  width: "40%",
  height: "auto",
  borderRadius: "10px",
});

const FullWidth = styled("div")({
  width: "100%",
  display: "flex",
});

const Cont = styled("div")({});

export default function MessageItem({ message }: Props) {
  return (
    <FullWidth
      style={
        message.sender !== "Sales"
          ? {
              flexDirection: "row",
            }
          : {
              flexDirection: "row-reverse",
            }
      }
    >
      <Container>
        <Typography>{message.text}</Typography>
      </Container>
    </FullWidth>
  );
}
