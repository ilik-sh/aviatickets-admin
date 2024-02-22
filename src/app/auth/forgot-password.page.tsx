import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useAppDispatch } from "hooks/redux.hooks";
import { forgotPassword } from "app/auth/store/auth.actions";
import { useNavigate } from "react-router-dom";
import { forgotPasswordFormSchema } from "./validation-schemas/forgot-password-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ForgotPasswordForm from "./components/forms/forgot-password-form.comp";
import { enqueueSnackbar } from "notistack";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { getDeviceId } from "./utils/get-device-id";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(forgotPasswordFormSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: { email: string }) => {
    let device = getDeviceId();

    const forgotData = {
      deviceId: device as string,
      email: values.email,
    };

    const response = await dispatch(forgotPassword(forgotData));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Verification email sent", {
        variant: "success",
      });
      navigate("/auth/verify");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ForgotPasswordForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        validationErrors={errors}
      />
    </Container>
  );
};

export default ForgotPasswordPage;
