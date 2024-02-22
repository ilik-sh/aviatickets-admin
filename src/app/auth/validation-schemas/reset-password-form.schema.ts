import * as Yup from "yup";

export const resetPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export type ResetPasswordFormYup = Yup.InferType<
  typeof resetPasswordFormSchema
>;
