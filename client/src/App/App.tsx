import React from 'react';

import Header from 'components/Header';
import Router from 'Router';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md" style={{ marginTop: '2rem'}}>
        <Router />
      </Container>
    </div>
  );
}

export default App;
