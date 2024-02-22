import React, { useState } from "react";
import { IconButton, InputBase, Box, styled, FormControl } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { chatSelector } from "app/chat/store/chat.selector";
import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { sendMessage } from "app/chat/store/chat.actions";
import { useForm } from "react-hook-form";

type Props = {};

const Container = styled("div")({
  flex: "0.1",
  display: "flex",
  alignItems: "center",
  maxWidth: "80%",
  width: "100%",
  height: "100%",
  gridArea: "form",
  margin: "0 auto",
});

const CustomForm = styled("form")({
  flexDirection: "row",
  width: "100%",
  gap: "10px",
  display: "flex",
});

const MessageInput = styled(InputBase)({
  width: "100%",
  borderRadius: "10px",
  backgroundColor: "#f0f1f2",
  padding: "5px",
});

export default function MessageForm({}: Props) {
  const dispatch = useAppDispatch();
  const { selectedClient } = useAppSelector(chatSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ text: string }>({
    mode: "onBlur",
    defaultValues: { text: "" },
  });

  const handleSendMessage = (values: { text: string }) => {
    const message: Message = {
      text: values.text,
      sender: "Sales",
      senderName: "Sales",
      reciever: selectedClient?.id as string,
      recieveName: selectedClient?.name as string,
      time: Date.now(),
    };
    dispatch(sendMessage(message));
    reset();
  };
  return (
    <Container>
      <CustomForm onSubmit={handleSubmit(handleSendMessage)}>
        <MessageInput
          {...register("text")}
          placeholder="Message"
          defaultValue=""
        />
        <IconButton type="submit">
          <SendIcon></SendIcon>
        </IconButton>
      </CustomForm>
    </Container>
  );
}
