import React, { useContext } from 'react'
import { UserContext, UserActionType } from "context/UserContext";
import GQLApiCall from 'utils/GQLApiCall';
import { UseFormSetError } from 'react-hook-form';
import Register from './Register';

const RegisterGQL = () => {
    const { userDispatch } = useContext(UserContext);

    const registerSubmit = async (values: any, setError: UseFormSetError<{ username: string; password: string; }>) => {
      const { username, password } = values;
  
      const { data, errors } = await GQLApiCall({
        query: {
          query: `mutation REGISTER($username: String!, $password: String!){
            register(username: $username, password: $password) { 
              _id, username
            }
          }`,
          variables: {
            username,
            password,
          },
        },
      });
  
      if (errors?.length > 0) {
        setError("username", { type: "usernameTaken", message: errors[0].message });
      } else if (data.register) {
        const { data } = await GQLApiCall({
          query: {
            query: `query LOGIN($username: String!, $password: String!){
              login(username: $username, password: $password) { 
                user { _id, username },
                token
              }
            }`,
            variables: {
              username,
              password,
            },
          },
        });
        if (data.login) {
          const { user, token } = data.login;
          userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { token, user } });
        }
      }
    };

  return (
    <Register registerSubmit={registerSubmit} />
  )
}

export default RegisterGQL