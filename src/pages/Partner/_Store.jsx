/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Table,
  CardFooter,
  Col,
  FormGroup
} from "reactstrap";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { API_URL } from "../../support/API_URL";
import { ON_EDIT_STORE, EDIT_STORE_VALUE, RESET_STORE_VALUE } from "../../support/types";

/**
 * ========================= RENDER PROFILE =========================
 */
const RowData = ({ edit, name, content, func, title }) => {
  const host = "http://localhost:2400/";
  return (
    <tr key={title}>
      <th style={{ minWidth: "5%", padding: "15px 0" }} scope="row">
        {title}
      </th>
      <td style={{ width: "5%", padding: "15px 0" }}>:</td>
      {edit ? (
        name === "storelink" ? (
          <td style={{ width: "80%", textAlign: "left", padding: "12px 0" }}>
            {host}&nbsp;
            <input type="text" name={name} onChange={func} defaultValue={content} />
          </td>
        ) : (
          <td style={{ width: "80%", textAlign: "left", padding: "12px 0" }}>
            <input type="text" name={name} onChange={func} defaultValue={content} />
          </td>
        )
      ) : name === "storelink" ? (
        <td style={{ width: "80%", textAlign: "left", padding: "15px 0" }}>{host + content}</td>
      ) : (
        <td style={{ width: "80%", textAlign: "left", padding: "15px 0" }}>{content}</td>
      )}
    </tr>
  );
};

/**
 * ============================================================================================
 */
export const Store = () => {
  /**
   * ========================= REDUX REDUCER =========================
   * desctructuring from State (redux's reducer)
   */
  const dispatch = useDispatch();
  const State = useSelector(({ User, Store }) => {
    return {
      onEdit: User.onEdit,
      userId: User.id,

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
  });
  const { userId, storeid, storename, storelink, phone, email, photo, address, city, province, onEdit } = State;

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
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Card>
          <FormGroup row>
            {/**
             * ================================================== profile photo
             */}
            <Col sm={4}>
              <CardBody style={{ paddingBottom: 0 }}>
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
              </CardBody>
            </Col>
            {/**
             * ================================================== render table
             */}
            <Col sm={8}>
              <CardBody style={{ paddingBottom: 0 }}>
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
              </CardBody>
            </Col>
          </FormGroup>
          <CardFooter className="d-flex">
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
              <button onClick={onEditClick} className="btn btn-sm btn-outline-dark ml-auto" style={{ width: "100px" }}>
                Edit
              </button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
