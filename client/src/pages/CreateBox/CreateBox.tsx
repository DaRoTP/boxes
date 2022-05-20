import React, { useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { ActivityType, LocationType } from "types";

interface CreateBoxProps {
  locations: LocationType[];
  searchLocations: (e: any) => void;
  activities: ActivityType[];
  fetchAllActivities: () => void;
  submitCreateNewBox: (values: any) => void;
}

const CreateBox: React.FC<CreateBoxProps> = ({
  locations,
  searchLocations,
  activities,
  fetchAllActivities,
  submitCreateNewBox,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      description: "",
      activity: "",
      origin: "",
      destination: "",
    },
  });

  useEffect(() => {
    fetchAllActivities();
    return () => {};
  }, []);

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <Typography sx={{ marginBottom: "2rem" }} gutterBottom variant="h5">
        Create Box Order
      </Typography>
      <form onSubmit={handleSubmit(submitCreateNewBox)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("description", { required: "field is required" })}
              multiline
              error={!!errors.description?.message}
              helperText={errors.description?.message}
              rows={3}
              label="description"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              {...register("activity", { required: "field is required" })}
              error={!!errors.activity?.message}
              inputProps={{ "aria-label": "Without label" }}
              fullWidth>
              {activities.map((activity) => (
                <MenuItem key={activity._id} value={activity._id}>
                  {`${activity.code} - ${activity.name}`}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              {...register("origin", {
                required: "field is required",
              })}
              onChange={(_, val) => val && setValue("origin", (val as LocationType).identifier)}
              disablePortal
              options={locations}
              onInputChange={searchLocations}
              loading={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.origin?.message}
                  helperText={errors.origin?.message}
                  label="Origin"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              {...register("destination", {
                required: "field is required",
              })}
              onChange={(_, val) =>
                val && setValue("destination", (val as LocationType).identifier)
              }
              disablePortal
              options={locations}
              onInputChange={searchLocations}
              loading={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.destination?.message}
                  helperText={errors.destination?.message}
                  label="Destination"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!isDirty || !isValid}
              variant="contained"
              size="medium"
              type="submit"
              fullWidth>
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateBox;
