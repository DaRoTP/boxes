import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useRef, useContext } from "react";
import * as userService from "service/rest/user.service";
import { useForm } from "react-hook-form";
import { UserContext, UserActionType } from "context/UserContext";

const Register = () => {
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

  const { userDispatch } = useContext(UserContext);

  const registerSubmit = async (values: any) => {
    const { username, password } = values;
    const { data, error } = await userService.register({ payload: { username, password } });
    if (error) {
      setError("username", { type: "usernameTaken", message: error.message });
    } else if (data) {
      const { data: { token, user } } = await userService.login({ payload: { username, password } });
      userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { token, user } });
    }
  };

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit(registerSubmit)}>
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
