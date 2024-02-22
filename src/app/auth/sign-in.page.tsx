import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { signIn } from "app/auth/store/auth.actions";
import { SignInForm as SignIn } from "app/auth/types/forms/sign-in.form";
import { useNavigate } from "react-router-dom";
import { signInFormSchema } from "app/auth/validation-schemas/sign-in-form.schema";
import Paper from "@mui/material/Paper";
import { yupResolver } from "@hookform/resolvers/yup";
import MainImage from "./components/main-image.comp";
import SignInForm from "./components/forms/sign-in-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";
import { getDeviceId } from "./utils/get-device-id";
import {
  BookingsModulePagePaths,
  ChatModulePagePaths,
} from "enums/page-paths.enum";
import { AuthDto } from "./types/auth.dto";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: yupResolver(signInFormSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignIn) => {
    let device = getDeviceId();

    const response = await dispatch(signIn(data));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    const role = response.payload as AuthDto;
    if (response.meta.requestStatus == "fulfilled") {
      if (role.user.roleType == "Admin") {
        navigate(BookingsModulePagePaths.Bookings);
      }
      if (role.user.roleType == "Sales") {
        navigate(ChatModulePagePaths.Chat);
      }
      enqueueSnackbar("Succesfully signed in", {
        variant: "success",
      });
      console.log(role);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <MainImage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignInForm
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          validationErrors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default SignInPage;
