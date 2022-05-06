import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Box sx={{ maxWidth: '50%', minWidth: '300px', margin: '0 auto' }}>
      <Stack spacing={2} >
        <TextField label="username" variant="outlined" />
        <TextField label="password" variant="outlined" type="password" />
        <Button variant="contained" size="medium">
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
