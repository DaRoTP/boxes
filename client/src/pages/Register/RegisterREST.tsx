import React, { useContext } from 'react'
import { UserContext, UserActionType } from "context/UserContext";
import { UseFormSetError } from 'react-hook-form';
import Register from './Register';
import * as RESTuserService from "service/rest/user.service";

const RegisterGQL = () => {
    const { userDispatch } = useContext(UserContext);

    const registerSubmit = async (values: any, setError: UseFormSetError<{ username: string; password: string; }>) => {
      const { username, password } = values;
      const { data, error } = await RESTuserService.register({ payload: { username, password } });
      if (error) {
        setError("username", { type: "usernameTaken", message: error.message });
      } else if (data) {
        const { data: { token, user } } = await RESTuserService.login({ payload: { username, password } });
        userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { token, user } });
      }
    };

  return (
    <Register registerSubmit={registerSubmit} />
  )
}

export default RegisterGQL