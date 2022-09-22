import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { userContext } from "../../App";

import axiosInstance from "../../utils/axiosInstance";
//mui components
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const userStore = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  const onLoginFormSubmit = async (event) => {
    event.preventDefault();
    const newEmailError = email === "",
      newPasswordError = password === "";
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    if (!newEmailError || !passwordError) {
      setLoginLoading(true);
      axiosInstance
        .post("login", {
          email: email,
          password: password,
        })
        .then((response) => {
          userStore.setUserDataOnLogin(response.data);
        })
        .catch((error) => {
          if (error?.response?.status === 400) {
            setShowAlert(true);
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="login-container">
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid credentials
        </Alert>
      </Snackbar>
      <Box
        component="form"
        className="login-form"
        noValidate
        autoComplete="off"
        onSubmit={onLoginFormSubmit}
      >
        {location?.state?.show && (
          <FormControl>
            <Alert severity="success">{location?.state?.message}</Alert>
          </FormControl>
        )}
        <TextField
          error={emailError}
          label="Email"
          id="email"
          type="email"
          required={true}
          helperText={emailError ? "Please Check your mail ID." : ""}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          error={passwordError}
          label="Create Password"
          id="password"
          type={showPassword ? "text" : "password"}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordError ? "Please enter the password" : ""}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl>
          <LoadingButton
            loading={loginLoading}
            loadingPosition="start"
            variant="contained"
            type="submit"
            startIcon={<LoginIcon />}
          >
            Login
          </LoadingButton>
        </FormControl>
        <div className="redirect">
          New User?&nbsp;
          <Link to="/signup">Signup</Link>
        </div>
      </Box>
    </div>
  );
};

export default Login;

