import { UserActionType } from ".";
import { UserType } from "types";

export interface LoginSuccessAction {
  type: UserActionType.LOGIN_SUCCESS;
  payload: {
    token?: string;
    user: UserType;
  };
}

export interface LoginFailAction {
  type: UserActionType.LOGIN_FAIL;
}

export interface LogoutAction {
  type: UserActionType.LOGOUT;
}

export type UserAction =
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction