/* eslint-disable no-unused-vars */
// /* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Nav,
  NavItem,
  NavLink,
  Spinner,
  TabContent,
  TabPane,
  Tooltip
} from "reactstrap";
import { FaEye, FaEyeSlash, FaRegEnvelope, FaAt, FaKey, FaUserAlt } from "react-icons/fa";
import classnames from "classnames";
import { CheckUsername, LoginAction, RegisterAction } from "../redux/actions";

function Logins() {
  const TextName = useSelector(state => state.auth.textName);
  const TextUser = useSelector(state => state.auth.textUser);
  const TextPass = useSelector(state => state.auth.textPass);
  const TextEmail = useSelector(state => state.auth.textEmail);
  const GoodUser = useSelector(state => state.auth.goodUser);
  const ErrorName = useSelector(state => state.auth.errorName);
  const ErrorUser = useSelector(state => state.auth.errorUser);
  const ErrorPass = useSelector(state => state.auth.errorPass);
  const ErrorEmail = useSelector(state => state.auth.errorEmail);
  const dispatch = useDispatch();

  // == CONTROL STATE OF TABS ===============================================
  const [activeTab, setActiveTab] = useState("2");
  const toggleTab = tab => (activeTab !== tab ? setActiveTab(tab) : null);

  // == STATE VALID =========================================================
  // const [nameValid, setNameValid] = useState(false);
  // const [userValid, setUserValid] = useState(false);
  // const [emailValid, setEmailValid] = useState(false);
  // const [passValid, setPassValid] = useState(false);
  // const toggleNameValid = prop => setNameValid(prop);
  // const toggleUserValid = prop => setUserValid(prop);
  // const toggleEmailValid = prop => setEmailValid(prop);
  // const togglePassValid = prop => setPassValid(prop);

  // == CONTROL ERROR ======================================================

  // ErrorName ? toggleNameValid(true) : toggleNameValid(false);
  // ErrorUser ? toggleUserValid(true) : toggleUserValid(false);
  // ErrorEmail ? toggleEmailValid(true) : toggleEmailValid(false);
  // ErrorPass ? togglePassValid(true) : togglePassValid(false);

  // == STATE INVALID ======================================================
  // const [nameInvalid, setNameInvalid] = useState(false);
  // const [userInvalid, setUserInvalid] = useState(false);
  // const [emailInvalid, setEmailInvalid] = useState(false);
  // const [passInvalid, setPassInvalid] = useState(false);/
  // const toggleNameInvalid = prop => setNameInvalid(prop);
  // const toggleUserInvalid = prop => setUserInvalid(prop);
  // const toggleEmailInvalid = prop => setEmailInvalid(prop);
  // const togglePassInvalid = prop => setPassInvalid(prop);

  // == CONTROL ERROR ======================================================
  // ErrorName ? toggleNameInvalid(true) : toggleNameInvalid(false);
  // ErrorUser ? toggleUserInvalid(true) : toggleUserInvalid(false);
  // ErrorEmail ? toggleEmailInvalid(true) : toggleEmailInvalid(false);
  // ErrorPass ? togglePassInvalid(true) : togglePassInvalid(false);

  // == STATE VALUES LOGIN ==================================================
  const [login, setLogin] = useState({ username: "", password: "" });
  const handleLoginValues = e => {
    let { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // == STATE VALUES REGISTER ===============================================
  const [register, setRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const handleRegisterValues = event => {
    let { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  };

  // == SHOW/HIDE PASSWORD ==================================================
  const [typePass, setTypePass] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const togglePass = type => {
    setTypePass(type);
    setShowPass(!showPass);
  };
  const [typePass2, setTypePass2] = useState("password");
  const [showPass2, setShowPass2] = useState(false);
  const togglePass2 = type => {
    setTypePass2(type);
    setShowPass2(!showPass2);
  };

  return (
    <Card className="card w-25 mx-auto">
      <CardHeader className="text-center">
        <Nav tabs className="card-header-tabs">
          <NavItem className="w-50">
            <NavLink
              id="login-link"
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggleTab("1")}>
              Login
            </NavLink>
          </NavItem>
          <NavItem className="w-50">
            <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => toggleTab("2")}>
              Register
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="login">
              <Form>
                <FormGroup id="form-username">
                  <InputGroup className="d-flex">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaAt color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      // valid={GoodUser}
                      style={{ zIndex: "10" }}
                      invalid={ErrorUser}
                      onChange={handleLoginValues}
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                    {ErrorUser ? <FormFeedback className="ml-5 float-left">{TextUser}</FormFeedback> : null}
                  </InputGroup>
                </FormGroup>

                <FormGroup id="form-password">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaKey color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ zIndex: "10" }}
                      invalid={ErrorPass}
                      onChange={handleLoginValues}
                      type={typePass}
                      name="password"
                      placeholder="Password"
                    />
                    <InputGroupAddon className="border-0" addonType="append">
                      {showPass ? (
                        <Button tabIndex="-1" onClick={() => togglePass("password")} color="light">
                          <FaEye color="#8a8a8a" />
                        </Button>
                      ) : (
                        <Button tabIndex="-1" onClick={() => togglePass("text")} color="light">
                          <FaEyeSlash color="#bababa" />
                        </Button>
                      )}
                    </InputGroupAddon>
                    {ErrorPass ? <FormFeedback className="form-error-message">{TextPass}</FormFeedback> : null}
                  </InputGroup>
                </FormGroup>

                <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                  <Label check>
                    <Input type="checkbox" /> Remember me
                  </Label>
                </FormGroup>

                <FormGroup id="form-button">
                  <Button
                    onClick={() => dispatch(LoginAction(login.username, login.password))}
                    color="secondary"
                    size="md"
                    block>
                    Login
                    {/* <Spinner color="light" size="sm" /> */}
                  </Button>
                  <div className="d-flex">
                    <NavLink href="#" className="ml-auto mt-1 p-0" style={{ fontSize: "0.75rem" }}>
                      Forgot your password?
                    </NavLink>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </TabPane>

          <TabPane tabId="2">
            <div className="register">
              <Form>
                <FormGroup id="form-name">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaUserAlt color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ zIndex: "10" }}
                      valid={ErrorName}
                      // invalid
                      onChange={handleRegisterValues}
                      type="text"
                      name="name"
                      id="register-name"
                      placeholder="Name"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup id="form-username">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaAt color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ zIndex: "10" }}
                      valid={GoodUser}
                      invalid={ErrorUser}
                      onChange={handleRegisterValues}
                      type="text"
                      name="username"
                      id="register-username"
                      placeholder="Username"
                    />
                    {ErrorUser ? <FormFeedback className="form-error-message">{TextUser}</FormFeedback> : null}
                  </InputGroup>
                </FormGroup>

                <FormGroup id="form-email">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaRegEnvelope color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ zIndex: "10" }}
                      valid={ErrorEmail}
                      // invalid={}
                      onChange={handleRegisterValues}
                      type="email"
                      name="email"
                      id="register-email"
                      placeholder="Email"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup id="form-password1">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaKey color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ zIndex: "10" }}
                      invalid={ErrorPass}
                      onChange={handleRegisterValues}
                      type={typePass}
                      name="password"
                      id="register-password1"
                      placeholder="Password"
                    />
                    <InputGroupAddon addonType="append">
                      {showPass ? (
                        <Button tabIndex="-1" onClick={() => togglePass("password")} color="light">
                          <FaEye color="#8a8a8a" />
                        </Button>
                      ) : (
                        <Button tabIndex="-1" onClick={() => togglePass("text")} color="light">
                          <FaEyeSlash color="#bababa" />
                        </Button>
                      )}
                    </InputGroupAddon>
                    {/* {ErrorPass ? <FormFeedback className="form-error-message">{TextPass}</FormFeedback> : null} */}
                  </InputGroup>
                </FormGroup>

                <FormGroup id="form-password2">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaKey color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      style={{ zIndex: "10" }}
                      invalid={ErrorPass}
                      onChange={handleRegisterValues}
                      type={typePass2}
                      name="password2"
                      id="register-password2"
                      placeholder="Re-enter Password"
                    />
                    <InputGroupAddon addonType="append">
                      {showPass2 ? (
                        <Button tabIndex="-1" onClick={() => togglePass2("password")} color="light">
                          <FaEye color="#8a8a8a" />
                        </Button>
                      ) : (
                        <Button tabIndex="-1" onClick={() => togglePass2("text")} color="light">
                          <FaEyeSlash color="#bababa" />
                        </Button>
                      )}
                    </InputGroupAddon>
                    {ErrorPass ? <FormFeedback className="form-error-message">{TextPass}</FormFeedback> : null}
                  </InputGroup>
                </FormGroup>

                {register.name && register.username && register.email && register.password && register.password2 ? (
                  <Fragment>
                    <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                      <Label check>
                        <Input type="checkbox" /> By clicking Submit, you agree to our <br />
                        <a href="#">Terms & Conditions</a>, Visitor Agreement <br />
                        and Privacy Policy.
                      </Label>
                    </FormGroup>

                    <FormGroup id="form-button">
                      <Button
                        onClick={() =>
                          dispatch(
                            RegisterAction(
                              register.name,
                              register.username,
                              register.email,
                              register.password,
                              register.password2
                            )
                          )
                        }
                        color="secondary"
                        size="md"
                        block>
                        Submit
                        {/* <Spinner color="light" size="sm" /> */}
                      </Button>
                    </FormGroup>
                  </Fragment>
                ) : register.username ? (
                  <FormGroup id="form-button">
                    <Button
                      onClick={() => dispatch(CheckUsername(register.username))}
                      color="secondary"
                      size="md"
                      block>
                      Check Username
                      {/* <Spinner color="light" size="sm" /> */}
                    </Button>
                  </FormGroup>
                ) : (
                  <FormGroup id="form-button">
                    <Button disabled color="secondary" size="md" block>
                      Input Username first
                    </Button>
                  </FormGroup>
                )}
              </Form>
            </div>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
}

export default Logins;
