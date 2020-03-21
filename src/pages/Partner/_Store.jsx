/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Card, CardBody, CardImg, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { API_URL } from "../../support/API_URL";
import { ON_EDIT_STORE, EDIT_STORE_VALUE, RESET_STORE_VALUE } from "../../support/types";

export const Store = () => {
  /**
   * ========================= REDUX REDUCER =========================
   * desctructuring from State (redux's reducer)
   */
  const dispatch = useDispatch();
  const { storeid, storename, storelink, phone, email, photo, address, city, province, onEdit } = useSelector(
    ({ User, Store }) => {
      return {
        userId: User.id,

        onEdit: Store.onEdit,

        storeid: Store.storeid,
        storename: Store.storename,
        storelink: Store.storelink,
        phone: Store.phone,
        email: Store.email,
        photo: Store.photo,
        address: Store.address,
        city: Store.city,
        province: Store.province
      };
    }
  );

  /**
   * ========================== EDIT DATA STATE =========================
   * Add new state for edit data
   * and create new variable for new (soon to be) uploaded photo profile
   */
  const [edit, setEdit] = useState({});
  let newPhotoURL = "";
  if (edit.photo) newPhotoURL = URL.createObjectURL(edit.photo);

  /**
   * ===================== HANDLE INPUT VALUE EDIT ====================
   * capture change of value on each input for edit data and save it to reducer state
   * and send it to backend with axios
   */
  const handleEditInput = ({ target }) => setEdit({ ...edit, [target.name]: target.value });
  const handleEditPhoto = ({ target }) => setEdit({ ...edit, photo: target.files[0] });

  const onEditClick = () => {
    setEdit({ ...edit, storename, storelink, phone, email, address, city, province });
    dispatch({ type: ON_EDIT_STORE });
  };

  const onCancelClick = () => {
    toast.error("Edit canceled!", {
      position: "bottom-left",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onOpen: () => {
        dispatch({ type: RESET_STORE_VALUE });
      }
    });
  };

  const onSaveClick = async () => {
    let formData = new FormData();
    let options = { headers: { "Content-Type": "multipart/form-data" } };
    let newData = {
      storename: edit.storename,
      phone: edit.phone,
      email: edit.email,
      address: edit.address,
      city: edit.city,
      province: edit.province
    };

    formData.append("photo", edit.photo);
    formData.append("data", JSON.stringify(newData));

    try {
      let { data } = await Axios.put(`${API_URL}/partner/edit/${storeid}`, formData, options);

      toast.info("Profile updated!", {
        position: "bottom-left",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        onOpen: () => {
          dispatch({ type: ON_EDIT_STORE });
          dispatch({ type: EDIT_STORE_VALUE, payload: data.result[0] });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * ============================== RETURN ==============================
   */
  if (!storename) {
    return null;
  }
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Card>
          <FormGroup row>
            {/**
             * ================================================== profile photo
             */}
            <Col sm={3} className="pr-0">
              <FormGroup className="d-flex flex-column">
                <Col>
                  <CardBody>
                    <Card className={onEdit ? "store-profile-edit" : "store-profile"}>
                      <CardImg src={newPhotoURL || `http://localhost:2400${photo}`} alt="profile photo" />
                      <label htmlFor="store-photo">
                        <div>
                          <span>
                            <FaCamera /> <br />
                            click to change photo
                          </span>
                        </div>
                      </label>
                      <input
                        id="store-photo"
                        type="file"
                        name="photo"
                        accept="image/png, image/jpeg"
                        onChange={({ target }) => handleEditPhoto({ target })}
                      />
                    </Card>
                    {onEdit && !newPhotoURL && <small className="text-secondary">*hover to edit photo</small>}
                    {onEdit && newPhotoURL && <small className="text-success">*new photo ready to save</small>}
                    {!onEdit && <small className="text-secondary disabled">*click edit to change photo</small>}
                  </CardBody>
                </Col>
                <Col>
                  <CardBody className="d-flex">
                    <div className="mx-auto">
                      {onEdit ? (
                        <>
                          <button onClick={onSaveClick} className="btn btn-sm btn-outline-primary ml-auto">
                            Save
                          </button>
                          <button onClick={onCancelClick} className="btn btn-sm btn-outline-danger ml-3">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={onEditClick} className="btn btn-sm btn-outline-dark mx-auto" style={{ width: "100px" }}>
                          Edit
                        </button>
                      )}
                    </div>
                  </CardBody>
                </Col>
              </FormGroup>
            </Col>
            {/**
             * ================================================== render table
             */}
            <Col sm={9} className="pl-0">
              <CardBody>
                <FormGroup id="s-storename" row>
                  <Label sm={2}>Store Name</Label>
                  <Col sm={10}>
                    <Input disabled={!onEdit} type="text" onChange={handleEditInput} name="storename" defaultValue={storename} />
                  </Col>
                </FormGroup>

                <FormGroup id="s-storelink" row>
                  <Label sm={2}>Store Link</Label>
                  <Col sm={10}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">http://localhost:2400/s/</InputGroupAddon>
                      <Input
                        disabled={!onEdit}
                        type="text"
                        onChange={handleEditInput}
                        name="storelink"
                        defaultValue={storelink}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup id="s-phone" row>
                  <Label sm={2}>Phone</Label>
                  <Col sm={10}>
                    <Input disabled={!onEdit} type="text" onChange={handleEditInput} name="phone" defaultValue={phone} />
                  </Col>
                </FormGroup>

                <FormGroup id="s-email" row>
                  <Label sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input disabled={!onEdit} type="text" onChange={handleEditInput} name="email" defaultValue={email} />
                  </Col>
                </FormGroup>

                <FormGroup id="s-address" row>
                  <Label sm={2}>Address</Label>
                  <Col sm={10}>
                    <Input disabled={!onEdit} type="text" onChange={handleEditInput} name="address" defaultValue={address} />
                  </Col>
                </FormGroup>

                <FormGroup id="s-city" row>
                  <Label sm={2}>City</Label>
                  <Col sm={10}>
                    <Input disabled={!onEdit} type="text" onChange={handleEditInput} name="city" defaultValue={city} />
                  </Col>
                </FormGroup>

                <FormGroup id="s-province" row>
                  <Label sm={2}>Province</Label>
                  <Col sm={10}>
                    <Input disabled={!onEdit} type="text" onChange={handleEditInput} name="province" defaultValue={province} />
                  </Col>
                </FormGroup>
              </CardBody>

              {/* <CardBody style={{ paddingBottom: 0 }}>
                <Table borderless>
                  <tbody>
                    <RowData edit={onEdit} func={handleEditInput} name="storename" title="Name" content={storename} />
                    <RowData edit={onEdit} func={handleEditInput} name="storelink" title="Link" content={storelink} />
                    <RowData edit={onEdit} func={handleEditInput} name="email" title="Email" content={email} />
                    <RowData edit={onEdit} func={handleEditInput} name="phone" title="Phone" content={phone} />
                    <RowData edit={onEdit} func={handleEditInput} name="address" title="Address" content={address} />
                    <RowData edit={onEdit} func={handleEditInput} name="city" title="City" content={city} />
                    <RowData edit={onEdit} func={handleEditInput} name="province" title="Province" content={province} />
                  </tbody>
                </Table>
              </CardBody> */}
            </Col>
          </FormGroup>
        </Card>
      </div>
    </div>
  );
};
