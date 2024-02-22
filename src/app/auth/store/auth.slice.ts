import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.state";
import {
  forgotPassword,
  signIn,
  signUp,
  resetPassword,
  verifyCode,
} from "app/auth/store/auth.actions";

const initialState: AuthState = {
  role: null,
  isPending: {
    signIn: false,
    signOut: false,
    signUp: false,
    forgotPassword: false,
    changePassword: false,
    resetPassword: false,
    verifyCode: false,
  },
  errors: {
    signIn: null,
    signOut: null,
    signUp: null,
    forgotPassword: null,
    changePassword: null,
    resetPassword: null,
    verifyCode: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isPending.signIn = true;
        state.errors.signIn = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.role = payload.user.roleType;
        state.isPending.signIn = false;
        state.errors.signIn = null;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.isPending.signIn = false;
        state.errors.signIn = payload?.message as string;
      })
      .addCase(signUp.pending, (state) => {
        state.isPending.signUp = true;
        state.errors.signUp = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.role = payload.user.roleType;
        state.isPending.signUp = false;
        state.errors.signUp = null;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isPending.signUp = false;
        state.errors.signUp = payload?.message as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isPending.forgotPassword = true;
        state.errors.forgotPassword = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isPending.forgotPassword = false;
        state.errors.forgotPassword = null;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.isPending.forgotPassword = false;
        state.errors.forgotPassword = payload?.message as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isPending.resetPassword = true;
        state.errors.resetPassword = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isPending.resetPassword = false;
        state.errors.resetPassword = null;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isPending.resetPassword = false;
        state.errors.resetPassword = payload?.message as string;
      })
      .addCase(verifyCode.pending, (state) => {
        state.isPending.verifyCode = true;
        state.errors.verifyCode = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.isPending.verifyCode = false;
        state.errors.verifyCode = null;
      })
      .addCase(verifyCode.rejected, (state, { payload }) => {
        state.isPending.verifyCode = false;
        state.errors.verifyCode = payload?.message as string;
      });
  },
});

export const authReducer = authSlice.reducer;
