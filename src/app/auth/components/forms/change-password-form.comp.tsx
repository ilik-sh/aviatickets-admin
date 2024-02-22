import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import PasswordField from "../password-field.comp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { StyledBox } from "../styled-centered-box.comp";
import { ChangePasswordFormYup } from "../../validation-schemas/change-password-form.schema";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";
import { styled } from "@mui/material";

interface ChangePasswordFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<ChangePasswordFormYup, any>;
  validationErrors: FieldErrors<ChangePasswordFormYup>;
}

const StyledCenteredBox = styled(StyledBox)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  return (
    <StyledCenteredBox>
      <IconTitle title="Change Password" Icon={AssignmentIcon} />
      <form noValidate onSubmit={onSubmit}>
        <PasswordField
          control={control}
          label="Old password"
          autoComplete="old-password"
          error={!!validationErrors.oldPassword}
          helperText={validationErrors.oldPassword?.message}
        />
        <PasswordField
          control={control}
          label="New Password"
          autoComplete="new-password"
          error={!!validationErrors.newPassword}
          helperText={validationErrors.newPassword?.message}
        />
        <PasswordField
          control={control}
          label="Confirm New Password"
          autoComplete="confirm-password"
          error={!!validationErrors.confirmNewPassword}
          helperText={validationErrors.confirmNewPassword?.message}
        />
        <StyledButton type="submit" fullWidth variant="contained">
          Change password
        </StyledButton>
      </form>
    </StyledCenteredBox>
  );
};

export default ChangePasswordForm;
