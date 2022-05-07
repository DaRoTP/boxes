import React from "react";
import { Paper } from "@mui/material";
import "./Footer.scss";

const Footer = () => {
  return (
    <Paper elevation={2} color="primary" className="app-footer">
      Moving boxes app 2022
      <div>
          <strong>Author:</strong>
          <span>Darius Rodzevic</span>
      </div>
      
    </Paper>
  );
};

export default Footer;
