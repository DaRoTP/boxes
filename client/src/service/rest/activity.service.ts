import RESTApiCall from "../utils/RESTApiCall";

interface getActivitiesRequest {
  isLoading?: (state: boolean) => void;
}

export const getAllActivities = async (serviceProps: getActivitiesRequest) => {
  return await RESTApiCall({
    url: "/activity",
    method: "GET",
    token: true,
    ...serviceProps,
  });
};

