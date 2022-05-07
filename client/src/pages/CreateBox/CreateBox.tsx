import React from "react";
import { Autocomplete, Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

const CreateBox = () => {
  const searchLocation = (e: any) => {
    return e;
  }

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <Stack spacing={2}>
        <TextField multiline rows={3} label="description" variant="outlined" fullWidth />
        <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Autocomplete
          disablePortal
          options={top100Films}
          filterOptions={searchLocation}
          renderInput={(params) => <TextField {...params} label="Origin" />}
        />
        <Autocomplete
          disablePortal
          options={top100Films}
          filterOptions={searchLocation}
          renderInput={(params) => <TextField {...params} label="Destination" />}
        />
        <Button variant="contained" size="medium" fullWidth>
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateBox;
