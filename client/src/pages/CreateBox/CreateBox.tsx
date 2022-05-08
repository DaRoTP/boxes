import React, { useState } from "react";
import { Autocomplete, Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { debounce } from "throttle-debounce";
import * as locationService from "service/rest/location.service";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

const CreateBox = () => {
  const [locations, setLocations] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      description: "",
      country: "",
      city: "",
      street: "",
      number: "",
      postcode: "",
    },
  });

  const searchLocations = debounce(1000, async (e) => {
    if (!e.target.value) {
      return;
    }
    const { data } = await locationService.getLocations({
      query: e.target.value,
    });
    if (data) {
      const { locations } = data;
      const locationWithLabel = locations.map((it: any) => ({...it, label: it.identifier}))
      setLocations(locationWithLabel);
    }
  });

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <Stack spacing={2}>
        <TextField multiline rows={3} label="description" variant="outlined" fullWidth />
        <Select inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Autocomplete
          disablePortal
          options={locations}
          onInputChange={searchLocations}
          loading={true}
          renderInput={(params) => <TextField {...params} label="Origin" />}
        />
        <Autocomplete
          disablePortal
          options={locations}
          onInputChange={searchLocations}
          loading={true}
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
