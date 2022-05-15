import axios, { Method, AxiosResponse } from "axios";
import history from "conf/history.conf";

export interface callAPIParams {
  url: string;
  method: Method;
  token?: boolean;
  payload?: any;
  params?: object;
  setLoading?: (state: boolean) => void
}

function responseHandler(response: AxiosResponse) {
  return {
    data: response.data,
    error: null,
    status: response.status,
  };
}

function errorHandler(error: any) {
  return {
    data: null,
    error: error.response?.data,
    status: error.response?.status,
  };
}


async function callAPI({
  url,
  method,
  params,
  token,
  payload,
  setLoading,
}: callAPIParams) {

  let headers = {};
  if (!!token) headers = { Authorization: localStorage.getItem("token") };
  
  !!setLoading && setLoading(true);
  try {
    const res = await axios({
      method,
      headers,
      params,
      url: `/api${url}`,
      data: payload,
    });
    !!setLoading && setLoading(false);

    return responseHandler(res);
  } catch (error) {
    if(error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = '/login';
    }

    return errorHandler(error);
  }
}

export default callAPI;