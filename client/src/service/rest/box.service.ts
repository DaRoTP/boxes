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

interface getBoxRequest {
  isLoading?: (state: boolean) => void;
  id: string;
}

export const getBox = async ({ id, ...serviceProps }: getBoxRequest) => {
  return await RESTApiCall({
    url: `/box/${id}`,
    method: "GET",
    token: true,
    ...serviceProps,
  });
};

interface getBoxHistoryRequest {
  isLoading?: (state: boolean) => void;
  id: string;
}

export const getBoxHistory = async ({ id, ...serviceProps }: getBoxHistoryRequest) => {
  return await RESTApiCall({
    url: `/box/${id}/history`,
    method: "GET",
    token: true,
    ...serviceProps,
  });
};

interface transferOrderRequest {
  isLoading?: (state: boolean) => void;
  id: string;
  targetLocationId: string;
  activityId: string;
}

export const transferOrder = async ({
  id,
  targetLocationId,
  activityId,
  ...serviceProps
}: transferOrderRequest) => {
  return await RESTApiCall({
    url: `/box/${id}/transfer`,
    method: "PATCH",
    token: true,
    payload: {
      targetLocationId,
      activityId,
    },
    ...serviceProps,
  });
};
