import LoginGQL from "./LoginGQL";
import LoginREST from "./LoginREST";

const Login = process.env.REACT_APP_API_API_TYPE === "GRAPHQL" ? LoginGQL : LoginREST;

export default Login;
