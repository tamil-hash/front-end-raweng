import React from "react";

//mui components
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const Login = () => {
  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className="login-container">
      <Box
        component="form"
        className="login-form"
        noValidate
        autoComplete="off"
        onSubmit={onLoginFormSubmit}
      >
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email" required={true} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" required={true} />
        </FormControl>
        <FormControl>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;

