/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReLoginAction } from "../../redux/actions/AuthActions";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
  Button
} from "reactstrap";
import { Spinner } from "../../components/Spinner";
import { MdAdd } from "react-icons/md";
import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import Swal from "sweetalert2";
import { CREATE_NEW_STORE, LOGIN_SUCCESS } from "../../support/types";

export const CreateStore = () => {
  const dispatch = useDispatch();
  const { Loading, Create, Logout } = useSelector(({ Store, User }) => {
    return {
      Loading: Store.loading,
      Create: Store.create,
      Logout: User.logout
    };
  });

  const handleOnChange = ({ target }) => setNewStore({ ...newStore, [target.name]: target.value });
  const handleAddPhoto = ({ target }) => setNewStore({ ...newStore, [target.name]: target.files[0] });
  const [newStore, setNewStore] = useState({
    storename: "",
    storelink: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    photo: undefined
  });
  const { storename, storelink, email, phone, address, city, province, photo } = newStore;
  console.log("res", newStore);

  async function handleCreateStore() {
    let formData = new FormData();
    let options = {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    let newStore = { storename, storelink, email, phone, address, city, province };
    formData.append("photo", photo);
    formData.append("data", JSON.stringify(newStore));

    Swal.fire({
      toast: true,
      title: "Save data Store?",
      icon: "warning",
      position: "center",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          dispatch({ type: "CREATE_STORE_START" });
          let store = await Axios.post(`${API_URL}/partner/create`, formData, options);
          localStorage.setItem("token", store.data.token);
          dispatch({ type: "CREATE_STORE_SUCCESS", payload: store.data.store });

          dispatch(ReLoginAction(localStorage.getItem("token")));
        } catch (err) {
          dispatch({ type: "CREATE_STORE_FAILED" });
          console.log("There's something bad happening on your server");
          console.log(err);
        }
      }
    });
  }

  if (Loading) {
    return (
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <Card className="w-75 mx-auto mb-4">
            <CardBody className="p-0 mt-3">
              <center>
                <h5>Creating new store...</h5>
              </center>
            </CardBody>
            <CardBody className="mx-5 pt-3">
              <Spinner />
            </CardBody>
          </Card>
        </div>
      </div>
    );
  } else {
    if (Create || Logout) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <Card className="w-75 mx-auto mb-4">
              <CardBody className="p-0 mt-3">
                <center>
                  <h5>New Store</h5>
                </center>
              </CardBody>
              <CardBody className="mx-5 pt-3">
                <Form>
                  {/* INPUT FORM */}
                  <Fragment>
                    <FormGroup id="new-s-storename" row>
                      <Label sm={2}>Store Name</Label>
                      <Col sm={10}>
                        <Input type="text" name="storename" onChange={handleOnChange} placeholder="input store name" />
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-storelink" row>
                      <Label sm={2}>Store Link</Label>
                      <Col sm={10}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">http://localhost:2400/s/</InputGroupAddon>
                          <Input type="text" name="storelink" onChange={handleOnChange} placeholder="input store link" />
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-email" row>
                      <Label sm={2}>Email</Label>
                      <Col sm={10}>
                        <Input type="email" name="email" onChange={handleOnChange} placeholder="input store email" />
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-phone" row>
                      <Label sm={2}>Phone</Label>
                      <Col sm={10}>
                        <Input type="text" name="phone" onChange={handleOnChange} placeholder="input store phone" />
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-address" row>
                      <Label sm={2}>Address</Label>
                      <Col sm={10}>
                        <Input type="text" name="address" onChange={handleOnChange} placeholder="input store address" />
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-city" row>
                      <Label sm={2}>City</Label>
                      <Col sm={10}>
                        <Input type="text" name="city" onChange={handleOnChange} placeholder="input store city" />
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-province" row>
                      <Label sm={2}>Province</Label>
                      <Col sm={10}>
                        <Input type="text" name="province" onChange={handleOnChange} placeholder="input store province" />
                      </Col>
                    </FormGroup>

                    <FormGroup id="new-s-photo" row>
                      <Label sm={2}>Photo</Label>
                      <Col sm={10}>
                        <Input
                          type="file"
                          name="photo"
                          accept="image/png, image/jpeg"
                          className="add-s-photo"
                          onChange={handleAddPhoto}
                          id="new-s-photo-input"
                        />
                        {photo === undefined ? (
                          <Fragment>
                            <Label for="new-s-photo-input" id="new-s-input">
                              <div className="add-photo-input">
                                <MdAdd className="plus_icon" />
                              </div>
                            </Label>
                            <UncontrolledTooltip placement="right" target="new-s-input">
                              click to input photo
                            </UncontrolledTooltip>
                          </Fragment>
                        ) : null}
                        {photo !== undefined ? (
                          <Fragment>
                            <Label for="new-s-photo-input" id="new-s-preview">
                              <div className="add-photo-preview">
                                <img src={URL.createObjectURL(photo)} alt="preview" />
                              </div>
                            </Label>
                            <UncontrolledTooltip placement="right" target="new-s-preview">
                              photo not uploaded yet
                            </UncontrolledTooltip>
                          </Fragment>
                        ) : null}
                      </Col>
                    </FormGroup>
                  </Fragment>

                  <FormGroup className="d-flex">
                    <div className="mx-auto">
                      <Button className="btn-primary" onClick={handleCreateStore}>
                        Save
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }
  }
};
