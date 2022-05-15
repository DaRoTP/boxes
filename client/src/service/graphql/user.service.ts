import GQLApiCall from "../utils/GQLApiCall";

interface LoginRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    username: string;
    password: string;
  };
}

export const login = async ({ payload, ...serviceProps }: LoginRequest) => {
  return await GQLApiCall({
    query: {
      query: `query LOGIN($username : String, $password: String){
        login(username: $username, password: $password) { 
          token,
          user {
            _id,
            username
          }
        }
      }`,
      variables: {
        ...payload,
      },
    },
    ...serviceProps,
  });
};


interface RegisterRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    username: string;
    password: string;
  };
}

export const register = async ({ payload, ...serviceProps }: RegisterRequest) => {
  return await GQLApiCall({
    query: {
      query: `mutation REGISTER($username: String!, $password: String!){
        register(username: $username, password: $password) { 
          _id,
          username
        }
      }`,
      variables: {
        ...payload,
      },
    },
    ...serviceProps,
  });
};
