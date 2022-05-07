import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

const CreateLocation = () => {
  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="country" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="city" variant="outlined" type="text" fullWidth />
          </Grid>
          <Grid item xs={6}>
          <TextField label="street" variant="outlined" type="text" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="number" variant="outlined" type="text" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="postal code" variant="outlined" type="text" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="medium" fullWidth>
              Create
            </Button>
          </Grid>
        </Grid>
    </Box>
  );
};

export default CreateLocation;
