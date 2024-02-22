import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { ChangePasswordForm as ChangePassword } from "app/auth/types/forms/change-password.form";
import { changePassword } from "app/auth/store/auth.actions";
import { changePasswordFormSchema } from "app/auth/validation-schemas/change-password-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import ChangePasswordForm from "./components/forms/change-password-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: yupResolver(changePasswordFormSchema),
    mode: "onBlur",
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = async (data: ChangePassword) => {
    const response = await dispatch(changePassword(data));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Succesfully changed password", { variant: "success" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ChangePasswordForm
        control={control}
        validationErrors={errors}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Container>
  );
};

export default ChangePasswordPage;
