// export { default } from "./Box";
import BoxGQL from "./BoxGQL";
import BoxREST from "./BoxREST";

const BoxPage = process.env.REACT_APP_API_API_TYPE === "GRAPHQL" ? BoxGQL : BoxREST;

export default BoxPage;