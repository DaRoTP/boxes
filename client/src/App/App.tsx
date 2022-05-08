import React, { useEffect, useContext } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import Router from "Router";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext, UserActionType } from "context/UserContext";

const someUser = {
  _id: "someID",
  username: "Darkowksi",
};

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

  useEffect(() => {
    userDispatch({
      type: UserActionType.LOGIN_SUCCESS,
      payload: { user: someUser, token: "sometoken" },
    });
    // setUser(someUser)
    return () => {};
  }, []);

  return (
    <div className="App">
      <Header pages={pages} />
      <Container maxWidth="md" style={{ marginTop: "2rem", flexGrow: "1" }}>
        <Router isAuth={authStatus} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
