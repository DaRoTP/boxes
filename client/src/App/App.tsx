import React, { useState, useEffect } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import Router from "Router";
import { Container } from "@mui/material";
import { UserType } from "types";
import {  useNavigate } from "react-router-dom";


const someUser = {
  _id: "someID",
  username: "Darkowksi",
};

function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const pages = [
    { label: "locations", callback: () => navigate('/location'), isAuth: true },
    { label: "boxes", callback: () => navigate('/'), isAuth: true },
  ];


  useEffect(() => {
    setUser(someUser)
    return () => {};
  }, []);

  return (
    <div className="App">
      <Header pages={pages} user={user} logoutUser={() => setUser(null)} />
      <Container maxWidth="md" style={{ marginTop: "2rem", flexGrow: '1' }}>
        <Router />
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
