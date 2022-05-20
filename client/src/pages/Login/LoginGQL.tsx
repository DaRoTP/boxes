import React, {useContext} from 'react'
import { UserContext, UserActionType } from "context/UserContext";
import * as GQLuserService from "service/graphql/user.service";
import Login from "./Login";
import { UseFormSetError } from 'react-hook-form';

const LoginGQL = () => {
  const { userDispatch } = useContext(UserContext);

    const loginSubmit = async (values: any, setError: UseFormSetError<{ username: string; password: string; }>) => {
    
        const { data, error } = await GQLuserService.login({ payload: values });
        if (error) {
            setError("username", { type: "badLogin", message: error.message });
            setError("password", { type: "badLogin", message: error.message });
        } else if (data) {
          const { token, user } = data.login;
          userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { token, user } });
        }
      };

  return (
   <Login loginSubmit={loginSubmit} />
  )
}

export default LoginGQL