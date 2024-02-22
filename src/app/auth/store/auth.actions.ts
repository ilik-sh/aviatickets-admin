import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangePasswordForm } from "../types/forms/change-password.form";
import { ForgotPasswordForm } from "../types/forms/forgot-password.form";
import { ResetPasswordForm } from "../types/forms/reset-password.form";
import { SignInForm } from "../types/forms/sign-in.form";
import { SignUpForm } from "../types/forms/sign-up.form";
import { VerifyCodeForm } from "../types/forms/verify-code.form";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import axios from "axios";
import repository from "aviatickets-submodule/libs/api/repository";
import { AuthDto } from "../types/auth.dto";
import { ForgotPasswordDto } from "../types/forgot-password.dto";
import { LocalStorageKeys } from "aviatickets-submodule/libs/enums/local-storage-keys.enum";
import { VerifyDto } from "../types/verify.dto";
import { getDeviceId } from "../utils/get-device-id";
import { Roles } from "aviatickets-submodule/libs/enums/roles.enum";

export const signIn = createAsyncThunk<
  AuthDto,
  SignInForm,
  { rejectValue: ApiError | undefined }
>("signIn", async (data, { rejectWithValue }) => {
  try {
    const deviceId = getDeviceId();
    const response = await repository.post("/auth/signin", {
      ...data,
      deviceId,
    });
    localStorage.setItem(
      LocalStorageKeys.AccessToken,
      response.data.accessToken
    );
    localStorage.setItem(
      LocalStorageKeys.RefreshToken,
      response.data.refreshToken
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error signing in",
      statusCode: 500,
    } as ApiError);
  }
});

export const signUp = createAsyncThunk<
  AuthDto,
  SignUpForm,
  { rejectValue: ApiError | undefined }
>("signUp", async (data, { rejectWithValue }) => {
  try {
    const deviceId = getDeviceId();
    const response = await repository.post("/auth/signup", {
      ...data,
      deviceId,
    });
    localStorage.setItem(
      LocalStorageKeys.AccessToken,
      response.data.accessToken
    );
    localStorage.setItem(
      LocalStorageKeys.RefreshToken,
      response.data.refreshToken
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error signing up",
      statusCode: 500,
    } as ApiError);
  }
});

export const forgotPassword = createAsyncThunk<
  ForgotPasswordDto,
  ForgotPasswordForm,
  { rejectValue: ApiError | undefined }
>("forgotPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/forgot-password", data);
    localStorage.setItem(LocalStorageKeys.ResetToken, response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error sending email",
      statusCode: 500,
    } as ApiError);
  }
});

export const resetPassword = createAsyncThunk<
  boolean,
  ResetPasswordForm,
  { rejectValue: ApiError | undefined }
>("resetPassword", async (data, { rejectWithValue }) => {
  try {
    await repository.post("/auth/reset-password", data);
    localStorage.removeItem(LocalStorageKeys.ResetToken);
    return true;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error resetting password",
      statusCode: 500,
    } as ApiError);
  }
});

export const verifyCode = createAsyncThunk<
  VerifyDto,
  VerifyCodeForm,
  { rejectValue: ApiError | undefined }
>("verifyCode", async (data, { rejectWithValue }) => {
  try {
    const response = await repository.post("/auth/verify-reset-code", data);
    if (response.data) {
      localStorage.setItem(LocalStorageKeys.ResetToken, response.data);
      return response.data;
    }
    if (!response.data) {
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error verifying code",
      statusCode: 500,
    } as ApiError);
  }
});

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordForm,
  { rejectValue: ApiError | undefined }
>("changePassword", async (data, { rejectWithValue }) => {
  try {
    await repository.post("/auth/change-password", data);
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error changing password",
      statusCode: 500,
    } as ApiError);
  }
});

export const signOut = createAsyncThunk<
  void,
  void,
  { rejectValue: ApiError | undefined }
>("signOut", async (_, { rejectWithValue }) => {
  try {
    await repository.post("/auth/signout");
    localStorage.removeItem(LocalStorageKeys.RefreshToken);
    localStorage.removeItem(LocalStorageKeys.ResetToken);
    return localStorage.removeItem(LocalStorageKeys.AccessToken);
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({
      message: "Error signing out",
      statusCode: 500,
    } as ApiError);
  }
});
