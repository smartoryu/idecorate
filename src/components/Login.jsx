/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
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
  // eslint-disable-next-line no-unused-vars
  Spinner,
  TabContent,
  TabPane
} from "reactstrap";
import { FaEye, FaEyeSlash, FaRegEnvelope, FaAt, FaKey, FaUserAlt } from "react-icons/fa";
import classnames from "classnames";

function Logins() {
  // const dispatch = useDispatch();

  // == STATE VALUES LOGIN
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });
  const handleLoginValues = e => {
    let { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // == STATE VALUES REGISTER
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

  // == CONTROL STATE OF TABS
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // == SHOW/HIDE PASSWORD
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

  // console.log("login", login);
  // console.log("reg", register);

  return (
    <Card className="card w-35 mx-auto">
      <CardHeader className="text-center">
        <Nav tabs className="card-header-tabs">
          <NavItem className="w-50">
            <NavLink className={classnames({ active: activeTab === "1" })} onClick={() => toggleTab("1")}>
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
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaAt color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={false}
                      onChange={handleLoginValues}
                      type="text"
                      name="username"
                      id="login-username"
                      placeholder="Username"
                    />
                  </InputGroup>
                  <FormFeedback className="form-error-message">Username error</FormFeedback>
                </FormGroup>

                <FormGroup id="form-password">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaKey color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={false}
                      onChange={handleLoginValues}
                      type={typePass}
                      name="password"
                      id="login-password"
                      placeholder="Password"
                    />
                    <InputGroupAddon addonType="append">
                      {showPass ? (
                        <Button onClick={() => togglePass("password")} color="light">
                          <FaEye color="#8a8a8a" />
                        </Button>
                      ) : (
                        <Button onClick={() => togglePass("text")} color="light">
                          <FaEyeSlash color="#bababa" />
                        </Button>
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  <FormFeedback className="form-error-message">Password error</FormFeedback>
                </FormGroup>

                <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                  <Label check>
                    <Input type="checkbox" /> Remember me
                  </Label>
                </FormGroup>

                <FormGroup id="form-button">
                  <Button color="secondary" size="md" block>
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
                      invalid={false}
                      onChange={handleRegisterValues}
                      type="text"
                      name="name"
                      id="register-name"
                      placeholder="Name"
                    />
                  </InputGroup>
                  <FormFeedback className="form-error-message">Name error</FormFeedback>
                </FormGroup>

                <FormGroup id="form-username">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaAt color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={false}
                      onChange={handleRegisterValues}
                      type="text"
                      name="username"
                      id="register-username"
                      placeholder="Username"
                    />
                  </InputGroup>
                  <FormFeedback className="form-error-message">Username error</FormFeedback>
                </FormGroup>

                <FormGroup id="form-email">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaRegEnvelope color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={false}
                      onChange={handleRegisterValues}
                      type="email"
                      name="email"
                      id="register-email"
                      placeholder="Email"
                    />
                  </InputGroup>
                  <FormFeedback className="form-error-message">Email error</FormFeedback>
                </FormGroup>

                <FormGroup id="form-password1">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaKey color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={false}
                      onChange={handleRegisterValues}
                      type={typePass}
                      name="password"
                      id="register-password1"
                      placeholder="Password"
                    />
                    <InputGroupAddon addonType="append">
                      {showPass ? (
                        <Button onClick={() => togglePass("password")} color="light">
                          <FaEye color="#8a8a8a" />
                        </Button>
                      ) : (
                        <Button onClick={() => togglePass("text")} color="light">
                          <FaEyeSlash color="#bababa" />
                        </Button>
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  <FormFeedback className="form-error-message">Password error</FormFeedback>
                </FormGroup>

                <FormGroup id="form-password2">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FaKey color="#bababa" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={false}
                      onChange={handleRegisterValues}
                      type={typePass2}
                      name="password2"
                      id="register-password2"
                      placeholder="Re-enter Password"
                    />
                    <InputGroupAddon addonType="append">
                      {showPass2 ? (
                        <Button onClick={() => togglePass2("password")} color="light">
                          <FaEye color="#8a8a8a" />
                        </Button>
                      ) : (
                        <Button onClick={() => togglePass2("text")} color="light">
                          <FaEyeSlash color="#bababa" />
                        </Button>
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  <FormFeedback className="form-error-message">Password error</FormFeedback>
                </FormGroup>

                <FormGroup check className="mb-3" style={{ fontSize: "0.75rem" }}>
                  <Label check>
                    <Input type="checkbox" /> By clicking Submit, you agree to our <br />
                    <a href="#">Terms & Conditions</a>, Visitor Agreement <br />
                    and Privacy Policy.
                  </Label>
                </FormGroup>

                <FormGroup id="form-button">
                  <Button color="secondary" size="md" block>
                    Submit
                    {/* <Spinner color="light" size="sm" /> */}
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
}

export default Logins;
