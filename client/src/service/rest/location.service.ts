import RESTApiCall from "../utils/RESTApiCall";

interface getLocationsRequest {
  isLoading?: (state: boolean) => void;
}

interface createLocationRequest {
  isLoading?: (state: boolean) => void;
  payload: {
    identidfier: string;
    country: string;
    street: string;
    city: string;
    number: string;
    postcode: string;
  };
}

export const createLocation = async (serviceProps: createLocationRequest) => {
  return await RESTApiCall({
    url: "/location",
    method: "POST",
    token: true,
    ...serviceProps,
  });
};

interface getLocationsRequest {
  isLoading?: (state: boolean) => void;
  page?: number;
  perPage?: number;
  query?: string;
}

export const getLocations = async ({
  query,
  page,
  perPage,
  ...serviceProps
}: getLocationsRequest) => {
  return await RESTApiCall({
    url: "/location",
    method: "GET",
    token: true,
    params: {
      page,
      perPage,
      query,
    },
    ...serviceProps,
  });
};
