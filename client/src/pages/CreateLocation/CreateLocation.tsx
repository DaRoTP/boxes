import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface CreateLocationProps {
  submitNewLocation: (values: any) => void
}

const CreateLocation: React.FC<CreateLocationProps> = ({ submitNewLocation }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      identifier: "",
      country: "",
      city: "",
      street: "",
      number: "",
      postcode: "",
    },
  });


  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <Typography sx={{ marginBottom: "2rem" }} gutterBottom variant="h5">
        Create Warehouse Location
      </Typography>
      <form onSubmit={handleSubmit(submitNewLocation)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("identifier", { required: "field is required" })}
              error={!!errors.identifier?.message}
              helperText={errors.identifier?.message}
              label="warehouse Identifier"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("country", { required: "field is required" })}
              error={!!errors.country?.message}
              helperText={errors.country?.message}
              label="country"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("city", { required: "field is required" })}
              error={!!errors.city?.message}
              helperText={errors.city?.message}
              label="city"
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("street", { required: "field is required" })}
              error={!!errors.street?.message}
              helperText={errors.street?.message}
              label="street"
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("number")}
              error={!!errors.number?.message}
              helperText={errors.number?.message}
              label="number"
              variant="outlined"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("postcode", { required: "field is required" })}
              error={!!errors.postcode?.message}
              helperText={errors.postcode?.message}
              label="post code"
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!isDirty || !isValid}
              variant="contained"
              size="medium"
              fullWidth
              type="submit">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateLocation;
