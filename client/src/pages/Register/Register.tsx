import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useForm, UseFormSetError } from "react-hook-form";

interface RegisterProps {
  registerSubmit: (values: any, setError: UseFormSetError<{ username: string; password: string; repeatPassword: string; }>) => void;
}

const Register: React.FC<RegisterProps> = ({ registerSubmit }) => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

 

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit((vals) => registerSubmit(vals, setError))}>
        <Stack spacing={2}>
          <TextField
            {...register("username", { required: "username is required" })}
            error={!!errors.username?.message}
            helperText={errors.username?.message}
            label="username"
            variant="outlined"
          />
          <TextField
            {...register("password", { required: "username is required" })}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            label="password"
            variant="outlined"
            type="password"
          />
          <TextField
            {...register("repeatPassword", {
              required: "repeat password is required",
              validate: (value) => value === password.current || "The passwords do not match",
            })}
            error={!!errors.repeatPassword?.message}
            helperText={errors.repeatPassword?.message}
            label="repeat password"
            variant="outlined"
            type="password"
          />
          <Button disabled={!isDirty || !isValid} type="submit" variant="contained" size="medium">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
