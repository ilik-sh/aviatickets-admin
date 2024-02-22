import { Roles } from "aviatickets-submodule/libs/enums/roles.enum";
import { BaseState } from "aviatickets-submodule/libs/types/base.state";

export interface AuthState extends BaseState {
  role: string | null;
  isPending: {
    signIn: boolean;
    signOut: boolean;
    signUp: boolean;
    forgotPassword: boolean;
    changePassword: boolean;
    resetPassword: boolean;
    verifyCode: boolean;
  };
  errors: {
    signIn: string | null;
    signOut: string | null;
    signUp: string | null;
    forgotPassword: string | null;
    changePassword: string | null;
    resetPassword: string | null;
    verifyCode: string | null;
  };
}
