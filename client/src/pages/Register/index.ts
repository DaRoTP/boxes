import RegisterGQL from "./RegisterGQL";
import RegisterREST from "./RegisterREST";

const Register = process.env.REACT_APP_API_TYPE === "GRAPHQL" ? RegisterGQL : RegisterREST;

export default Register;
