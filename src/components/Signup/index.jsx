import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
//mui components
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { emailRegex, passwordRegex } from "../../utils/constants";

import axiosInstance from "../../utils/axiosInstance";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "Learner",
  confirmPassword: "",
  nameError: false,
  emailError: false,
  passwordError: false,
  confirmPasswordError: false,
  isLoading: false,
  showPassword: false,
  showAlert: false,
  alertMessage: "",
  alertType: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.payload };
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.payload };
    case "CHANGE_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "CHANGE_ROLE":
      return { ...state, role: action.payload };
    case "ERROR_SET":
      return { ...state, ...action.payload };
    case "ERROR_RESET":
      return {
        ...state,
        nameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
      };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    case "SET_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SHOW_ALERT":
      return {
        ...state,
        ...action.payload,
        showAlert: true,
      };
    case "HIDE_ALERT":
      return { ...state, showAlert: false };
    default:
      throw new Error();
  }
}

const Signup = () => {
  const navigate = useNavigate();
  const [signupStates, dispatch] = useReducer(reducer, initialValues);

  const onUserSignUp = async (event) => {
    dispatch({
      type: "ERROR_RESET",
    });
    event.preventDefault();
    let nameError = signupStates.name === "" ? true : false;
    let emailError = emailRegex.test(signupStates.email) ? false : true;
    let passwordError = passwordRegex.test(signupStates.password)
      ? false
      : true;
    let confirmPasswordError =
      signupStates.password === signupStates.confirmPassword ? false : true;

    if (nameError || emailError || passwordError || confirmPasswordError) {
      dispatch({
        type: "ERROR_SET",
        payload: { nameError, emailError, passwordError, confirmPasswordError },
      });
    } else {
      dispatch({ type: "START_LOADING", payload: true });
      axiosInstance
        .post("register", {
          name: signupStates.name,
          email: signupStates.email,
          password: signupStates.password,
          role: signupStates.role,
        })
        .then((response) => {
          navigate("/login", {
            state: {
              show: true,
              message: "Account Created successfully. Please login",
            },
          });
        })
        .catch((error) => {
          if (error.response.status === 409) {
            dispatch({
              type: "SHOW_ALERT",
              payload: {
                alertMessage: "Account already exists. Please try logging in.",
                alertType: "error",
              },
            });
          }
        })
        .finally(() => {
          dispatch({ type: "STOP_LOADING", payload: false });
        });
    }
  };

  const handleAlertClose = () => {
    dispatch({ type: "HIDE_ALERT" });
  };

  return (
    <div className="login-container">
      <Snackbar
        open={signupStates.showAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={signupStates.alertType}
          sx={{ width: "100%" }}
        >
          {signupStates.alertMessage}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        className="login-form"
        noValidate
        autoComplete="off"
        onSubmit={onUserSignUp}
      >
        <TextField
          error={signupStates.nameError}
          label="Name"
          id="name"
          type="text"
          required={true}
          helperText={signupStates.nameError ? "Please Enter your name." : ""}
          onChange={(e) =>
            dispatch({ type: "CHANGE_NAME", payload: e.target.value })
          }
          value={signupStates.name}
        />
        <TextField
          error={signupStates.emailError}
          label="Email"
          id="email"
          type="email"
          required={true}
          helperText={
            signupStates.emailError ? "Please Enter Proper mail ID." : ""
          }
          onChange={(e) =>
            dispatch({ type: "CHANGE_EMAIL", payload: e.target.value })
          }
          value={signupStates.email}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Role"
          value={signupStates.role}
          onChange={(e) =>
            dispatch({ type: "CHANGE_ROLE", payload: e.target.value })
          }
        >
          <MenuItem value="Instructor">Instructor</MenuItem>
          <MenuItem value="Learner">Learner</MenuItem>
          ))}
        </TextField>
        <TextField
          error={signupStates.passwordError}
          label="Create Password"
          id="password"
          type={signupStates.showPassword ? "text" : "password"}
          required={true}
          onChange={(e) =>
            dispatch({ type: "CHANGE_PASSWORD", payload: e.target.value })
          }
          helperText="must contain at least 1 Capital letter, 1 Small letter, and 1 number"
          value={signupStates.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => dispatch({ type: "SET_SHOW_PASSWORD" })}
                >
                  {signupStates.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={signupStates.confirmPasswordError}
          label="Confirm Password"
          id="confirmpassword"
          type={signupStates.showPassword ? "text" : "password"}
          required={true}
          helperText={
            signupStates.confirmPasswordError ? "Passwords did not match." : ""
          }
          onChange={(e) =>
            dispatch({
              type: "CHANGE_CONFIRM_PASSWORD",
              payload: e.target.value,
            })
          }
          value={signupStates.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => dispatch({ type: "SET_SHOW_PASSWORD" })}
                >
                  {signupStates.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl>
          <LoadingButton
            loading={signupStates.isLoading}
            loadingPosition="start"
            variant="contained"
            type="submit"
            startIcon={<HowToRegIcon />}
          >
            Signup
          </LoadingButton>
        </FormControl>
        <div className="redirect">
          Already have an account?&nbsp;
          <Link to="/login">Login</Link>
        </div>
      </Box>
    </div>
  );
};

export default Signup;

