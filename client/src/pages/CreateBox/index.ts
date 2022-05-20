import CreateBoxGQL from "./CreateBoxGQL";
import CreateBoxREST from "./CreateBoxREST";

const CreateBox = process.env.REACT_APP_API_API_TYPE === "GRAPHQL" ? CreateBoxGQL : CreateBoxREST;

export default CreateBox;
