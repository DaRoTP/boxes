import RESTApiCall from "../utils/RESTApiCall";

interface loginRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    username: string;
    password: string;
  };
}

export const login = async (serviceProps: loginRequest) => {
  return await RESTApiCall({
    url: "/user/login",
    method: "POST",
    ...serviceProps,
  });
};

interface registerRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    username: string;
    password: string;
  };
}

export const register = async (serviceProps: registerRequest) => {
  return await RESTApiCall({
    url: "/user/register",
    method: "POST",
    ...serviceProps,
  });
};


interface isAuthRequest {
  isLoading?: (state: boolean) => void;
}

export const isAuthenticated = async (serviceProps: isAuthRequest) => {
  return await RESTApiCall({
    url: "/user/isAuth",
    token: true,
    method: "GET",
    ...serviceProps,
  });
};
