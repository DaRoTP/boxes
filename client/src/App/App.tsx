import React from 'react';

import Header from 'components/Header';
import Router from 'Router';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header 
        settings={[
          { label: "Profile", to: "/profile" },
          { label: "Logout", to: "/logout" },
        ]}
        pages={[
          { label: "Login", to: "/login" },
          { label: "Register", to: "/register" },
        ]} />
      <Container maxWidth="md" style={{ marginTop: '2rem'}}>
        <Router />
      </Container>
    </div>
  );
}

export default App;
