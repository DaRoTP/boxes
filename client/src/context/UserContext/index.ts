import { UserType } from "types";

export * from "./UserContext";

export type AuthStatus = "success" | "failed" | null;

export enum UserActionType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
}

export type UserState = {
  authStatus: AuthStatus;
  user: UserType | null;
};