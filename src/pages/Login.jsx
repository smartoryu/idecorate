/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import { LoginAction } from "../redux/actions";

import { FaTimes } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Login = () => {
  const AuthLogin = useSelector(state => state.auth.login);
  const ErrorUser = useSelector(state => state.auth.errorUser);
  const ErrorPass = useSelector(state => state.auth.errorPass);
  const WrongUser = useSelector(state => state.auth.wrongUser);
  const WrongPass = useSelector(state => state.auth.wrongPass);
  // const ModalLogin = useSelector(state => state.modal.login);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const closeLogin = () => dispatch({ type: "MODAL_LOGIN", payload: false });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  if (AuthLogin) {
    return null;
  } else {
    return (
      <Modal centered size="sm" /* isOpen={ModalLogin} */ isOpen toggle={closeLogin}>
        <ModalHeader className="ml-auto border-0">
          <FaTimes onClick={closeLogin} />
        </ModalHeader>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper pb-4">
            <Typography component="h3" variant="h6">
              Sign In
            </Typography>
            <form className="form" noValidate>
              <TextField // USERNAME FIELD
                id="login-username"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={handleChange("username")}
                error={ErrorUser}
                helperText={WrongUser}
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                color="primary"
              />

              <TextField // PASSWORD FIELD
                id="login-password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={handleChange("password")}
                error={ErrorPass}
                helperText={WrongPass}
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                color="primary"
              />

              <Button // SIGN-IN BUTTON
                onClick={() => dispatch(LoginAction(values.username, values.password))}
                fullWidth
                variant="contained"
                color="primary"
                className="mt-3 mb-4">
                Sign In
              </Button>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Link href="#" variant="inherit">
                    {"Forgot password?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="inherit">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Modal>
    );
  }
};

export default Login;
