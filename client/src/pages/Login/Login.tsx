import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm, UseFormSetError } from "react-hook-form";

interface LoginProps {
  loginSubmit: (values: any, setError: UseFormSetError<{ username: string; password: string; }>) => void;
}

const Login: React.FC<LoginProps> = ({ loginSubmit }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit((val) => loginSubmit(val, setError))}>
        <Stack spacing={2}>
          <TextField
            {...register("username", { required: "field is required" })}
            error={!!errors.username?.message}
            helperText={errors.username?.message}
            label="username"
            variant="outlined"
          />
          <TextField
            {...register("password", { required: "field is required" })}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            label="password"
            variant="outlined"
            type="password"
          />
          <Button disabled={!isDirty || !isValid} type="submit" variant="contained" size="medium">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
