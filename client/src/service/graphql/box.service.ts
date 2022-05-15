import GQLApiCall from "../utils/GQLApiCall";

interface getBoxesRequest {
  isLoading?: (state: boolean) => void;
  page?: number;
  perPage?: number;
}

const getBoxesQuery = "{ query boxes {  } }"

// export const getBoxes = async ({ page, perPage, ...serviceProps }: getBoxesRequest) => {
//   return await GQLApiCall({
//     params: {
//       page,
//       perPage,
//     },
//     ...serviceProps,
//   });
// };
