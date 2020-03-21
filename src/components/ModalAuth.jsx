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
  Modal,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import { FaAt, FaEye, FaEyeSlash, FaRegEnvelope, FaTimes, FaKey, FaUserAlt } from "react-icons/fa";
import { CheckUsername, LoginAction, RegisterAction } from "../redux/actions";
import { LOGOUT, CHANGE_MODAL_ACTIVE_TAB } from "../support/types";

const ModalAuth = props => {
  /**
   *
   *
   * =================================================== REDUCER ON REDUX ==
   */
  const GoodUser = useSelector(({ Auth }) => Auth.goodUser);
  const ErrorUserLog = useSelector(({ Auth }) => Auth.errorUserLog);
  const ErrorPassLog = useSelector(({ Auth }) => Auth.errorPassLog);
  const Verified = useSelector(({ User }) => User.verified);

  const ErrorName = useSelector(({ Auth }) => Auth.errorName);
  const ErrorUser = useSelector(({ Auth }) => Auth.errorUser);
  const ErrorPass = useSelector(({ Auth }) => Auth.errorPass);
  const ErrorEmail = useSelector(({ Auth }) => Auth.errorEmail);

  const dispatch = useDispatch();

  /**
   * ======================================================= CONTROL LOGIN ====
   * - All values from input is stored in login object
   * - The input is controlled with onChange's function (handleLoginValues)
   * - There are two ways of form submitance:
   *   1. Through button login onClick triggering dispatch(LoginAction)
   *   2. With pressing "Enter" keyboard triggering dispatch(LoginAction)
   */
  const [login, setLogin] = useState({ username: "", password: "" });
  const handleLoginValues = ({ target }) => setLogin({ ...login, [target.name]: target.value });
  const loginKeyPress = ({ key }) => key === "Enter" && dispatch(LoginAction(login.username, login.password));

  /**
   * ==================================================== CONTROL REGISTER ====
   * - All values from input is stored in register object
   * - The input is controlled with onChange's function (handleRegisterValues)
   * - There are two ways of form submitance:
   *   1. Through button register onClick triggering dispatch(RegisterAction)
   *   2. With pressing "Enter" keyboard triggering dispatch(RegisterAction)
   */
  const [register, setRegister] = useState("");
  // const [register, setRegister] = useState({ name: "", username: "", email: "", password: "", password2: "" });
  const handleRegisterValues = ({ target }) => setRegister({ ...register, [target.name]: target.value });
  const registerKeyPress = ({ key }) => key === "Enter" && dispatch(RegisterAction(register));

  /**
   * ================================================== SHOW/HIDE PASSWORD ====
   * This section is responsible for showing/hiding the password text on login or register form
   * - typePassLog, typePass, and typePass2 is to set default type of input which is "password"
   *   so, the input form's type is refering to this state.
   * - showPassLog, showPass, and showPass2 is to change the "eye" logo to indicate whether password is shown or not
   * - the type parameter which sent to toggle is a string "text" to replace the "password" input type
   */
  const [typePassLog, setTypePassLog] = useState("password");
  const [showPassLog, setShowPassLog] = useState(false);
  const togglePassLog = type => {
    setTypePassLog(type);
    setShowPassLog(!showPassLog);
  };
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

  /**
   * ======================================================= CONTROL MODAL ====
   * - This section is controlling the whole component
   *   because the Login-Register component wrapped in <Modal> component
   * - The <Modal> isOpen property is watching a boolean in redux's reducer
   */
  const ModalAuth = useSelector(({ Auth }) => Auth.modalAuth);
  const ActiveTab = useSelector(({ Auth }) => Auth.activeTab);
  const closeLogin = () => dispatch({ type: LOGOUT });

  /**
   * =============================================== CONTROL STATE OF TABS ====
   * - This section is controlling the component
   *   which component is rendered, Login or Register
   */
  // const [activeTab, setActiveTab] = useState(ActiveTab);
  const toggleTab = tab => (ActiveTab !== tab ? dispatch({ type: CHANGE_MODAL_ACTIVE_TAB, payload: tab }) : null);

  /**
   * ====================================================== RENDER SECTION ====
   */
  return (
    <Modal autoFocus={false} fade={false} style={{ width: "300px" }} centered isOpen={ModalAuth} toggle={closeLogin}>
      <ModalHeader className="border-0" toggle={closeLogin}>
        {Verified !== "true" && (
          <span style={{ fontSize: "14px" }}>
            Check your email.
            <br /> Verify your account first!
          </span>
        )}
      </ModalHeader>
      <Card className="w-100 mx-auto">
        <CardHeader className="text-center">
          <Nav tabs className="card-header-tabs" style={{ cursor: "pointer" }}>
            <NavItem className="w-50">
              <NavLink className={classnames({ active: ActiveTab === "1" })} onClick={() => toggleTab("1")}>
                Login
              </NavLink>
            </NavItem>
            <NavItem className="w-50">
              <NavLink className={classnames({ active: ActiveTab === "2" })} onClick={() => toggleTab("2")}>
                Register
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={ActiveTab}>
            {/**
             * ============================================================================== TAB CONTENT ===
             */}
            <TabPane tabId="1">
              {/**
               * ========================================================================== LOGIN CONTROL ===
               */}
              <div className="login">
                <Form>
                  {/**
                   * THIS IS USERNAME INPUT'S SECTION
                   */}
                  <FormGroup id="form-username">
                    <InputGroup className="d-flex">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FaAt color="#bababa" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus={true}
                        style={{ zIndex: "10" }}
                        invalid={Boolean(ErrorUserLog)}
                        onChange={handleLoginValues}
                        onKeyPress={loginKeyPress}
                        type="text"
                        name="username"
                        placeholder="Username"
                      />
                      {Boolean(ErrorUserLog) && <FormFeedback className="ml-5 float-left">{ErrorUserLog}</FormFeedback>}
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
                        invalid={Boolean(ErrorPassLog)}
                        onChange={handleLoginValues}
                        onKeyPress={loginKeyPress}
                        type={typePassLog}
                        name="password"
                        placeholder="Password"
                      />
                      <InputGroupAddon className="border-0" addonType="append">
                        {showPassLog ? (
                          <Button tabIndex="-1" onClick={() => togglePassLog("password")} color="light">
                            <FaEye color="#8a8a8a" />
                          </Button>
                        ) : (
                          <Button tabIndex="-1" onClick={() => togglePassLog("text")} color="light">
                            <FaEyeSlash color="#bababa" />
                          </Button>
                        )}
                      </InputGroupAddon>
                      {Boolean(ErrorPassLog) ? <FormFeedback className="ml-5 float-right">{ErrorPassLog}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  <FormGroup id="form-checkbox" check className="mb-3" style={{ fontSize: "0.75rem" }}>
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
              {/**
               * ========================================================================= REGISTER CONTROL ===
               */}
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
                        invalid={Boolean(ErrorName)}
                        onChange={handleRegisterValues}
                        onKeyPress={registerKeyPress}
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
                        invalid={Boolean(ErrorUser)}
                        onChange={handleRegisterValues}
                        onKeyPress={registerKeyPress}
                        type="text"
                        name="username"
                        id="register-username"
                        placeholder="Username"
                      />
                      {!GoodUser ? <FormFeedback className="form-error-message">{ErrorUser}</FormFeedback> : null}
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
                        invalid={Boolean(ErrorEmail)}
                        onChange={handleRegisterValues}
                        onKeyPress={registerKeyPress}
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
                        invalid={Boolean(ErrorPass)}
                        onChange={handleRegisterValues}
                        onKeyPress={registerKeyPress}
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
                        invalid={Boolean(ErrorPass)}
                        onChange={handleRegisterValues}
                        onKeyPress={registerKeyPress}
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
                      {Boolean(ErrorPass) ? <FormFeedback className="form-error-message">{ErrorPass}</FormFeedback> : null}
                    </InputGroup>
                  </FormGroup>

                  {register.username && register.password && register.password2 ? (
                    <Fragment>
                      {/* <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                        <Label check>
                          <Input type="checkbox" /> By clicking Submit, you agree to our <br />
                          <a tabIndex="-1" href="#">
                            Terms & Conditions
                          </a>
                          , Visitor Agreement <br />
                          and Privacy Policy.
                        </Label>
                      </FormGroup> */}

                      {Boolean(ErrorName) || Boolean(ErrorEmail) ? (
                        <span className="form-error-message text-danger ">{ErrorName}</span>
                      ) : null}
                      <FormGroup id="form-button">
                        <Button onClick={() => dispatch(RegisterAction(register))} color="secondary" size="md" block>
                          Submit
                        </Button>
                      </FormGroup>
                    </Fragment>
                  ) : register.username ? (
                    <FormGroup id="form-button">
                      <Button onClick={() => dispatch(CheckUsername(register.username))} color="secondary" size="md" block>
                        Check Username
                      </Button>
                    </FormGroup>
                  ) : (
                    <FormGroup id="form-button">
                      <Button disabled color="secondary" size="md" block style={{ cursor: "not-allowed" }}>
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
    </Modal>
  );
};

export default ModalAuth;
