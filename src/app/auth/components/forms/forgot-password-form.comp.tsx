import React, { FC } from "react";
import IconTitle from "../icon-title.comp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { StyledBox } from "../styled-centered-box.comp";
import { ForgotPasswordFormYup } from "../../validation-schemas/forgot-password-form.schema";
import { Control, FieldErrors } from "react-hook-form";
import { StyledButton } from "../styled-button.comp";
import CustomLink from "../custom-link.comp";
import TextField from "aviatickets-submodule/libs/components/text-field.comp";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

interface ForgotPasswordFormProps {
  onSubmit: React.FormEventHandler;
  control: Control<ForgotPasswordFormYup, any>;
  validationErrors: FieldErrors<ForgotPasswordFormYup>;
}

const StyledCenteredBox = styled(StyledBox)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  control,
  validationErrors,
}) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/auth/signin");
  };

  return (
    <StyledCenteredBox>
      <IconTitle title="Forgot password?" Icon={AssignmentIcon} />
      <form noValidate onSubmit={onSubmit}>
        <TextField
          control={control}
          name="Email"
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
        />
        <StyledButton type="submit" variant="contained">
          Next
        </StyledButton>
        <CustomLink text="Back to sign in" onClick={handleLinkClick} />
      </form>
    </StyledCenteredBox>
  );
};

export default ForgotPasswordForm;
