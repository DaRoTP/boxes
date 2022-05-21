import React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  Stack,
  Paper,
  Divider,
  Chip,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import moment from "moment";

import { BoxType, BoxHistoryEntryType, ActivityType, LocationType } from "types";
import { useForm } from "react-hook-form";

interface BoxPageProps {
  boxId: string;
  boxDetails: Partial<Pick<BoxType, "description" | "destination" | "origin" | "activity">>;
  boxHistory: BoxHistoryEntryType[];
  submitTransfer: (val: any) => void;
  locations: LocationType[];
  activities: ActivityType[];
  searchLocations: (e: any) => void;
}

const BoxPage: React.FC<BoxPageProps> = ({
  boxId,
  boxDetails,
  boxHistory,
  submitTransfer,
  locations,
  activities,
  searchLocations,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      location: "",
      activity: "",
    },
  });

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: "bold" }}>
          <div>Tracking number: </div>
          <Chip label={boxId} />
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: "bold" }}>
          <div>Activity: </div>
          <Chip color="primary" label={boxDetails?.activity?.name} />
        </Typography>
      </Stack>
      <Stack spacing={2} style={{ marginTop: "1rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Transfer
          </Typography>
          <Divider style={{ margin: "1rem 0" }} />
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <div>
                <Typography sx={{ fontSize: 10 }} gutterBottom>
                  Origin
                </Typography>
              </div>
              <span style={{ height: "10px", flexGrow: "1", borderBottom: "dashed 2px black" }} />
              <LocalShippingIcon />
              <span style={{ height: "10px", flexGrow: "1", borderBottom: "dashed 2px black" }} />
              <ArrowForwardIosIcon />
              <div>
                <Typography sx={{ fontSize: 10 }} gutterBottom>
                  Destination
                </Typography>
              </div>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column" spacing={1} justifyContent="center">
                <Chip label={boxDetails?.origin?.identifier} />
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.primary">
                  {boxDetails?.origin?.country} | {boxDetails?.origin?.city}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {boxDetails?.origin?.street} / {boxDetails?.origin?.number} -{" "}
                  {boxDetails?.origin?.postcode}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={1} justifyContent="center">
                <Chip label={boxDetails?.destination?.identifier} />
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="text.primary">
                  {boxDetails?.destination?.country} | {boxDetails?.destination?.city}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {boxDetails?.destination?.street} / {boxDetails?.destination?.number} -{" "}
                  {boxDetails?.destination?.postcode}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Description
            </Typography>
            <Divider style={{ margin: "1rem 0" }} />
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {boxDetails?.description}
            </Typography>
          </CardContent>
        </Card>
        <form onSubmit={handleSubmit(submitTransfer)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                {...register("location", {
                  required: "field is required",
                })}
                onChange={(_, val) => val && setValue("location", (val as LocationType).identifier)}
                disablePortal
                options={locations}
                onInputChange={searchLocations}
                loading={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.location?.message}
                    helperText={errors.location?.message}
                    label="Location"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                <Select
                  {...register("activity", { required: "field is required" })}
                  error={!!errors.activity?.message}
                  labelId="demo-simple-select-label"
                  label="Activity"
                  fullWidth>
                  {activities?.map((activity) => (
                    <MenuItem key={activity._id} value={activity._id}>
                      {`${activity.code} - ${activity.name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={!isDirty || !isValid}
                variant="contained"
                size="medium"
                fullWidth
                style={{ gap: "0.5rem" }}>
                <LocalShippingIcon />
                Transfer
              </Button>
            </Grid>
          </Grid>
        </form>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              History
            </Typography>
            <Divider style={{ margin: "1rem 0" }} />
            <Stack style={{ overflowY: "scroll", maxHeight: "30rem" }} spacing={2}>
              {boxHistory?.map((historyEntry) => (
                <Grid container>
                  <Grid item xs={4}>
                    <Chip label={historyEntry?.currentLocation?.identifier} />
                  </Grid>
                  <Grid item xs={3}>
                    <Chip color="primary" label={historyEntry?.activity?.code} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>
                      {moment(historyEntry.timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default BoxPage;
