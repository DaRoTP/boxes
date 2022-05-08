import React, { useReducer, Reducer, createContext } from "react";
import { UserAction } from "./UserActions";
import { UserActionType } from ".";
import { UserState } from ".";
import { UserType } from "types";

const initialState: UserState = {
  authStatus: null,
  user: null,
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
      return { ...state, user: action.payload.user as UserType, authStatus: "success" };
    case UserActionType.LOGIN_FAIL:
      localStorage.removeItem("token");
      return { ...state, user: null, authStatus: "failed" };
    case UserActionType.LOGOUT:
      localStorage.removeItem("token");
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