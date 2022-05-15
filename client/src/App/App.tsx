import React, { useContext } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import Router from "Router";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "context/UserContext";

function App() {
  const navigate = useNavigate();

  const {
    userState: { authStatus },
  } = useContext(UserContext);

  const pages = [
    { label: "locations", callback: () => navigate("/location"), isAuth: true },
    { label: "boxes", callback: () => navigate("/"), isAuth: true },
  ];


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
