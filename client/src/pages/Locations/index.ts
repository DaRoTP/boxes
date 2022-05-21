import locationsGQL from "./LocationsGQL";
import locationsREST from "./LocationsREST";

const Locations =
  process.env.REACT_APP_API_TYPE === "GRAPHQL" ? locationsGQL : locationsREST;

export default Locations;