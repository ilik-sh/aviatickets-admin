import * as Yup from "yup";

export const changePasswordFormSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{8,}/g,
      "Weak password!"
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export type ChangePasswordFormYup = Yup.InferType<
  typeof changePasswordFormSchema
>;
