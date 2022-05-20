import CreateLocationGQL from "./CreateLocationGQL";
import CreateLocationREST from "./CreateLocationREST";

const CreateLocation =
  process.env.REACT_APP_API_API_TYPE === "GRAPHQL" ? CreateLocationGQL : CreateLocationREST;

export default CreateLocation;
