import BoxesGQL from "./BoxesGQL";
import BoxesREST from "./BoxesREST";

const Boxes = process.env.REACT_APP_API_API_TYPE === "GRAPHQL" ? BoxesGQL : BoxesREST;

export default Boxes;
