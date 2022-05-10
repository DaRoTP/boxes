import React, { useState, useEffect } from "react";
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
import { debounce } from "throttle-debounce";
import * as locationService from "service/rest/location.service";
import * as activityService from "service/rest/activity.service";
import * as boxService from "service/rest/box.service";
import { ActivityType, LocationType } from "types";
import { useNavigate } from "react-router-dom";

interface ActivityOptionType extends ActivityType {
  label: string;
}

const CreateBox = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  const [activities, setActivities] = useState<ActivityOptionType[]>([]);

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

  const fetchAllActivities = async () => {
    const { data } = await activityService.getAllActivities({});
    if (data) {
      setActivities(
        data.activities.map(({ _id, code, name }: any) => ({
          _id,
          code,
          name,
          label: `${code} - ${name}`,
        }))
      );
    }
  };

  useEffect(() => {
    fetchAllActivities();
    return () => {};
  }, []);

  const submitCreateNewBox = async (val: any) => {
    const { activity, description, origin, destination } = val;
    const { data } = await boxService.createNewBoxOrder({
      payload: { activityId: activity, description, originId: origin, destinationId: destination },
    });
    if (data) {
      navigate("/");
    }
  };

  const searchLocations = debounce(1000, async (e) => {
    if (!e.target.value) {
      return;
    }
    const { data } = await locationService.getLocations({
      query: e.target.value,
      page: 0,
      perPage: 6,
    });
    if (data) {
      const { locations } = data;
      const locationWithLabel = locations.map((it: any) => ({ ...it, label: it.identifier }));
      setLocations(locationWithLabel);
    }
  });

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
                  {activity.label}
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
