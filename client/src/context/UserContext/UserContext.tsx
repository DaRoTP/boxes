import React, { useReducer, Reducer, createContext } from "react";
import { UserAction } from "./UserActions";
import { UserActionType } from ".";
import { UserState } from ".";
import { UserType } from "types";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState: UserState = {
  authStatus: token && user ? "success" : null,
  user: user ? JSON.parse(user) : null,
};

export const UserContext = createContext<{
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}>({
  userState: initialState,
  userDispatch: () => undefined,
});

const reducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case UserActionType.LOGIN_SUCCESS:
      !!action.payload.token && localStorage.setItem("token", action.payload.token);
      !!action.payload.user && localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user as UserType, authStatus: "success" };
    case UserActionType.LOGIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: null, authStatus: "failed" };
    case UserActionType.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: null, authStatus: null, currentBoard: { role: null, id: null } };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
  );
};