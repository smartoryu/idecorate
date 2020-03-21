/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  FormFeedback,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  NavLink,
  CardTitle,
  CardHeader
} from "reactstrap";
import { Redirect, useParams } from "react-router-dom";
import { FaAt, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

import { Spinner } from "../components/Spinner";
import {
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_FAILED,
  CHANGE_USER_VERIFY,
  CHANGE_PASS_VERIFY,
  CHANGE_TYPE_VERIFY
} from "../support/types";
import { HandleVerifyAccount } from "../redux/actions/AccountVerificationActions";

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { Loading, Verification, isRedirect, Username, Password, ShowPassowrd, TypePassword, ErrorMessage } = useSelector(
    ({ AccountVerification }) => {
      return {
        Loading: AccountVerification.loading,
        Verification: AccountVerification.verification,
        isRedirect: AccountVerification.isRedirect,

        Username: AccountVerification.username,
        Password: AccountVerification.password,

        ShowPassowrd: AccountVerification.showPassowrd,
        TypePassword: AccountVerification.typePassword,

        ErrorMessage: AccountVerification.errorMessage
      };
    }
  );
  const enterKeyPress = ({ key }) =>
    key === "Enter" && dispatch(HandleVerifyAccount({ Username, Password, Params: params.idverify }));

  const [timer, setTimer] = useState(5);
  function countdown(timer) {
    return setInterval(() => setTimer(timer - 1), 1000);
  }
  timer === -1 && clearInterval(countdown);

  if (timer === 0) {
    return <Redirect to="/" />;
  }
  if (Loading) {
    if (Verification === "success") {
      countdown(timer);
      return (
        <Card className="w-25 mx-auto my-5">
          <CardBody className="mx-auto font-smaller pt-4 pb-2">
            <center>Your account is verified!</center>
          </CardBody>
          <CardBody>
            <center>{`Redirecting in... ${timer}`}</center>
          </CardBody>
        </Card>
      );
    } else if (Verification === "failed") {
      countdown(timer);
      return (
        <Card className="w-25 mx-auto my-5">
          <CardBody className="mx-auto font-smaller pt-4 pb-2">
            <center>Your confirmation link is expired.</center>
          </CardBody>
          <CardBody>
            <center>{`Redirecting in... ${timer}`}</center>
          </CardBody>
        </Card>
      );
    } else {
      return (
        <div style={Style.container} className="mx-auto mb-5">
          <Card>
            <CardBody className="mx-auto">
              <h5 className="">Verification</h5>
              {Loading && <Spinner />}
            </CardBody>
          </Card>
        </div>
      );
    }
  }
  return (
    <Card className="w-25 mx-auto my-5">
      <CardBody className="mx-auto font-smaller pt-4 pb-2">
        <center>Please log in with your account to verify.</center>
      </CardBody>
      <CardBody>
        <FormGroup>
          <InputGroup className="d-flex">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FaAt color="#bababa" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              autoFocus={true}
              style={{ zIndex: "10" }}
              onChange={({ target }) => dispatch({ type: CHANGE_USER_VERIFY, payload: target.value })}
              onKeyPress={enterKeyPress}
              invalid={Boolean(ErrorMessage)}
              type="text"
              name="username"
              placeholder="Username"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FaKey color="#bababa" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              style={{ zIndex: "10" }}
              onChange={({ target }) => dispatch({ type: CHANGE_PASS_VERIFY, payload: target.value })}
              onKeyPress={enterKeyPress}
              invalid={Boolean(ErrorMessage)}
              type={TypePassword}
              name="password"
              placeholder="Password"
            />
            <InputGroupAddon className="border-0" addonType="append">
              {ShowPassowrd ? (
                <Button
                  tabIndex="-1"
                  onClick={() => dispatch({ type: CHANGE_TYPE_VERIFY, payload: { show: false, type: "password" } })}
                  color="light">
                  <FaEye color="#8a8a8a" />
                </Button>
              ) : (
                <Button
                  tabIndex="-1"
                  onClick={() => dispatch({ type: CHANGE_TYPE_VERIFY, payload: { show: true, type: "text" } })}
                  color="light">
                  <FaEyeSlash color="#bababa" />
                </Button>
              )}
            </InputGroupAddon>
            {Boolean(ErrorMessage) ? <FormFeedback className="ml-5 float-right">{ErrorMessage}</FormFeedback> : null}
          </InputGroup>
        </FormGroup>

        <Button
          onClick={() => dispatch(HandleVerifyAccount({ Username, Password, Params: params.idverify }))}
          className="mt-3"
          color="secondary"
          size="md"
          block>
          Login
        </Button>
      </CardBody>
    </Card>
  );
};

const Style = {
  container: { minHeight: "20vh", width: "50%" },
  text1: { color: "red", fontSize: "13px" }
};

export default VerifyAccount;
