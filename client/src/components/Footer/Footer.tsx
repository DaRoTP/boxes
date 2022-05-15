import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import "./Footer.scss";
import GQLLogo from "assets/images/GraphQL-logo.png";
import RESTLogo from "assets/images/REST-logo.png";

const Footer = () => {
  const getLogo = () => {
    const API_TYPE = process.env.REACT_APP_API_TYPE || "REST";
    return API_TYPE === "REST" ? RESTLogo : GQLLogo;
  }

  return (
    <Paper elevation={2} color="primary" className="app-footer">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} justifyContent="center" sx={{ display: 'flex' }}>
          <Typography>Moving boxes app 2022</Typography>
        </Grid>
        <Grid item xs={12} justifyContent="center" sx={{ display: 'flex' }}>
          <Typography>Author:</Typography>
          <Typography style={{ fontWeight: "bold" }}>Darius Rodzevic</Typography>
        </Grid>
      </Grid>
      <img style={{ objectFit: 'contain', height: '2rem', width: '8rem'}} src={getLogo()} alt="graphql" />
    </Paper>
  );
};

export default Footer;
