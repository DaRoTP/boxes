import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useContext } from "react";
import * as userService from "service/rest/user.service";
import { useForm } from "react-hook-form";
import { UserContext, UserActionType } from "context/UserContext";

const Login = () => {
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

  const { userDispatch } = useContext(UserContext);

  const loginSubmit = async (values: any) => {
    const { data, error } = await userService.login({ payload: values });
    if (error) {
      setError("username", { type: "badLogin", message: error.message });
      setError("password", { type: "badLogin", message: error.message });
    } else if (data) {
      const { token, user } = data;
      userDispatch({ type: UserActionType.LOGIN_SUCCESS, payload: { token, user } });
    }
  };

  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit(loginSubmit)}>
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
          <Button disabled={!isDirty || !isValid} type="submit" variant="contained" size="medium">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
