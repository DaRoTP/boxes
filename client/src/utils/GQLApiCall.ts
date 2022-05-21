import axios, { AxiosResponse } from "axios";

export interface callAPIParams {
  token?: boolean;
  query: any;
  params?: object;
  setLoading?: (state: boolean) => void
}

async function callAPI({
  params,
  token,
  query,
  setLoading,
}: callAPIParams) {

  let headers = {};
  if (!!token) headers = { Authorization: localStorage.getItem("token") };
  
  !!setLoading && setLoading(true);
  try {
    const res: AxiosResponse = await axios({
      url: "/api/graphql",
      method: 'POST',
      headers,
      data: query,
    });
    !!setLoading && setLoading(false);

    const { data, errors } = res.data;

    return {
      data, errors
    };

  } catch (error) {
    // if(error.response.status === 401) {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    //   window.location.href = '/login';
    // }

    return {
      data: null,
      error: error.response?.data?.length,
    };
  }
}

export default callAPI;
