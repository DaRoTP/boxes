import RESTApiCall from "../utils/RESTApiCall";

interface createNewBoxOrderRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    description: string;
    activityId: string;
    originId: string;
    destinationId: string;
  };
}

export const createNewBoxOrder = async (serviceProps: createNewBoxOrderRequest) => {
  return await RESTApiCall({
    url: "/box",
    method: "POST",
    token: true,
    ...serviceProps,
  });
};

interface getBoxesRequest {
  isLoading?: (state: boolean) => void;
  page?: number;
  perPage?: number;
}

export const getBoxes = async ({ page, perPage, ...serviceProps }: getBoxesRequest) => {
  return await RESTApiCall({
    url: "/box",
    method: "GET",
    token: true,
    params: {
      page,
      perPage,
    },
    ...serviceProps,
  });
};
