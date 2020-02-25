/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { API_URL } from "../../support/API_URL";
import { STORE_GET, ON_EDIT_STORE, EDIT_STORE_VALUE, RESET_STORE_VALUE } from "../../support/types";

export const Profile = () => {
  /**
   * ========================= REDUX REDUCER =========================
   */
  const dispatch = useDispatch();
  const State = useSelector(({ partner }) => {
    return {
      onEdit: partner.onEdit,
      userId: partner.id,

      storename: partner.storename,
      phone: partner.phone,
      email: partner.email,
      // photo: partner.photo,
      photo: "http://localhost:2400/products/images/PRODUCT1582534869639.png",
      address: partner.address,
      city: partner.city,
      province: partner.province,

      newStorename: partner.newStorename,
      newPhone: partner.newPhone,
      newEmail: partner.newEmail,
      newPhoto: partner.newPhoto,
      newAddress: partner.newAddress,
      newCity: partner.newCity,
      newProvince: partner.newProvince
    };
  });

  /**
   * =============================== MISC ===============================
   * desctructuring from State (redux's reducer)
   * and add new variable for new (soon to be) uploaded photo profile
   */
  const { userId, storename, phone, email, photo, address, city, province, onEdit } = State;
  const { newStorename, newPhone, newEmail, newPhoto, newAddress, newCity, newProvince } = State;
  let newPhotoURL = "";
  if (newPhoto) newPhotoURL = URL.createObjectURL(newPhoto);

  /**
   * ========================= USE EFFECT =========================
   */
  useEffect(() => {
    const fetchStore = async () => {
      try {
        let { data } = await Axios.get(`${API_URL}/partner?userid=${userId}`);
        dispatch({ type: STORE_GET, payload: data.result });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStore();
  }, [userId, dispatch]);

  /**
   * ==================== HANDLE INPUT ONCHANGE ===================
   * capture change of value on each input for edit data and save it to reducer state
   */
  const handleEditValues = ({ target }) =>
    dispatch({ type: EDIT_STORE_VALUE, payload: { [target.name]: target.files[0] } });

  /**
   * ========================= RENDER PROFILE =========================
   */
  const RowData = ({ content, editName, title }) => {
    if (onEdit) {
      return (
        <tr>
          <th style={{ minWidth: "5%", padding: "15px 0" }} scope="row">
            {title}
          </th>
          <td style={{ minWidth: "5%", padding: "15px 0" }}>:</td>
          <td style={{ width: "80%", textAlign: "left", padding: "12px 0" }}>
            <input
              style={{ lineHeight: "2px" }}
              type="text"
              name={editName}
              defaultValue={content}
              onChange={({ target }) => handleEditValues({ target })}
            />
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <th style={{ minWidth: "5%", padding: "15px 0" }} scope="row">
            {title}
          </th>
          <td style={{ minWidth: "5%", padding: "15px 0" }}>:</td>
          <td style={{ width: "80%", textAlign: "left", padding: "15px 0" }}>{content}</td>
        </tr>
      );
    }
  };

  // console.log(newPhoto);
  /**
   *
   * ============================== RETURN ==============================
   *
   */
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Card>
          <FormGroup row>
            <Col sm={4}>
              <CardBody style={{ paddingBottom: 0 }}>
                <Card className={onEdit ? "store-profile-edit" : "store-profile"}>
                  <CardImg src={newPhotoURL || photo} alt="profile photo" />
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
                    name="newPhoto"
                    accept="image/png, image/jpeg"
                    onChange={({ target }) => handleEditValues({ target })}
                  />
                </Card>
                {onEdit && !newPhotoURL && <small className="text-secondary">*hover to edit photo</small>}
                {newPhotoURL && <small className="text-success">*new photo ready to save</small>}
              </CardBody>
            </Col>
            <Col sm={8}>
              <CardBody style={{ paddingBottom: 0 }}>
                <Table borderless>
                  <tbody>
                    <RowData editName="newStorename" title="Name" content={storename} />
                    <RowData editName="newEmail" title="Email" content={email} />
                    <RowData editName="newPhone" title="Phone" content={phone} />
                    <RowData editName="newAddress" title="Address" content={address} />
                    <RowData editName="newCity" title="City" content={city} />
                    <RowData editName="newProvince" title="Province" content={province} />
                  </tbody>
                </Table>
              </CardBody>
            </Col>
          </FormGroup>
          <CardFooter className="d-flex">
            {onEdit ? (
              <>
                <button
                  onClick={() => dispatch({ type: RESET_STORE_VALUE })}
                  className="btn btn-sm btn-outline-primary ml-auto">
                  Save
                </button>
                <button
                  onClick={() => dispatch({ type: ON_EDIT_STORE })}
                  className="btn btn-sm btn-outline-danger ml-3">
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => dispatch({ type: ON_EDIT_STORE })}
                className="btn btn-sm btn-outline-dark ml-auto"
                style={{ width: "100px" }}>
                Edit
              </button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
