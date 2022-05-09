import RESTApiCall from "../utils/RESTApiCall";

interface createNewBoxOrderRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    description: string;
    activity: string;
    origin: string;
    destination: string;
  }
}

export const createNewBoxOrder = async (serviceProps: createNewBoxOrderRequest) => {
  return await RESTApiCall({
    url: "/box",
    method: "POST",
    token: true,
    ...serviceProps,
  });
};

