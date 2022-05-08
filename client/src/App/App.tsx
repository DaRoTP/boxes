import React, { useEffect, useContext } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import Router from "Router";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext, UserActionType } from "context/UserContext";
import * as userService from "service/rest/user.service";

function App() {
  const navigate = useNavigate();

  const {
    userDispatch,
    userState: { authStatus },
  } = useContext(UserContext);

  const pages = [
    { label: "locations", callback: () => navigate("/location"), isAuth: true },
    { label: "boxes", callback: () => navigate("/"), isAuth: true },
  ];

  const loginOnEnter = async () => {
    const token = localStorage.getItem("token");
    if (authStatus !== "success" && token) {
      const { data, error } = await userService.isAuthenticated({});
      if (data)
        userDispatch({
          type: UserActionType.LOGIN_SUCCESS,
          payload: { user: data },
        });
      else if (error) userDispatch({ type: UserActionType.LOGIN_FAIL });
    }
  };

  useEffect(() => {
    loginOnEnter();
    return () => {};
  }, []);

  return (
    <div className="App">
      <Header pages={pages} />
      <Container maxWidth="xl" style={{ marginTop: "2rem", flexGrow: "1" }}>
        <Router isAuth={authStatus} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
