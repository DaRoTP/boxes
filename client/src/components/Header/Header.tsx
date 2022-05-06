import React from 'react'

import Button from '@mui/material/Button';
import "./Header.scss";
import { Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <Container maxWidth="xl" disableGutters style={{ display: "flex", justifyContent: "space-between"}}>
        <NavLink to="/">
          <Typography variant="h5">
            Moving Boxes
          </Typography>
        </NavLink>
        <div className="app-header__login-btn-container">
          <NavLink to="/login">
            <Button variant="contained" size="medium">
              Login
            </Button>
          </NavLink>
          <NavLink to="/register">
            <Button variant="outlined" size="medium">
              Register
            </Button>
          </NavLink>
        </div>
      </Container>
    </header>
  )
}

export default Header