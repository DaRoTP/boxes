import GQLApiCall from "../utils/GQLApiCall";

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
  return await GQLApiCall({
    token: true,
    query: {
      "query": `query GET_FULL_LOCATIONS($page : Int, $perPage: Int, $query: String){
        totalItems,
        locations(page: $page, perPage: $perPage, query: $query) { 
          _id,
          identifier,
          country,
          city,
          street,
          number,
          postcode,
        }
      }`,
      "variables": {
        page,
        perPage,
      }
    },
    ...serviceProps,
  });
};
