import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { ResetPasswordForm as ResetPassword } from "app/auth/types/forms/reset-password.form";
import { resetPassword } from "app/auth/store/auth.actions";
import { resetPasswordFormSchema } from "app/auth/validation-schemas/reset-password-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import ResetPasswordForm from "./components/forms/reset-password-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: yupResolver(resetPasswordFormSchema),
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPassword) => {
    const response = await dispatch(resetPassword(data));

    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Password succesfully changed", {
        variant: "success",
      });
      navigate("/auth/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ResetPasswordForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        validationErrors={errors}
      />
    </Container>
  );
};

export default ResetPasswordPage;
