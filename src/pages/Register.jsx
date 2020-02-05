/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "@reach/router";
import { RegisterAction } from "../redux/actions";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Register = () => {
  const AuthLogin = useSelector(state => state.auth.login);
  const RegisterDone = useSelector(state => state.auth.register);
  const ErrorName = useSelector(state => state.auth.errorName);
  const ErrorUser = useSelector(state => state.auth.errorUser);
  const ErrorPass = useSelector(state => state.auth.errorPass);
  const ErrorEmail = useSelector(state => state.auth.errorEmail);
  const WrongName = useSelector(state => state.auth.wrongName);
  const WrongUser = useSelector(state => state.auth.wrongUser);
  const WrongPass = useSelector(state => state.auth.wrongPass);
  const WrongEmail = useSelector(state => state.auth.wrongEmail);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const openLogin = () => {
    dispatch({ type: "MODAL_LOGIN", payload: true });
  };

  if (AuthLogin || RegisterDone) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper my-5">
          <Typography align={"center"} component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className="form" noValidate>
            <TextField // NAME FIELD
              id="register-name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("name")}
              error={WrongName}
              helperText={ErrorName}
              label="Name"
              name="name"
              autoFocus
            />
            <TextField // EMAIL FIELD
              id="register-email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("email")}
              error={WrongEmail}
              helperText={ErrorEmail}
              label="Email"
              name="email"
              type="email"
            />
            <TextField // USERNAME FIELD
              id="register-username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("username")}
              error={WrongUser}
              helperText={ErrorUser}
              label="Username"
              name="username"
            />
            <TextField // PASSWORD FIELD
              id="register-password1"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("password1")}
              error={WrongPass}
              helperText={ErrorPass}
              label="Password"
              name="password1"
              type="password"
            />
            <TextField // RE-ENTER PASSWORD FIELD
              id="register-password2"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange("password2")}
              error={WrongPass}
              helperText={ErrorPass}
              label="Re-enter Password"
              name="password2"
              type="password"
            />

            <Button // SIGN-IN BUTTON
              onClick={() =>
                dispatch(RegisterAction(values.name, values.username, values.email, values.password1, values.password2))
              }
              fullWidth
              variant="contained"
              color="default"
              className="mt-3 mb-3">
              Register
            </Button>
            <Grid container spacing={1}>
              <Grid item xs></Grid>
              <Grid item>
                <Link onClick={openLogin} variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
};

export default Register;
