/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, CustomInput, Form, FormFeedback, FormGroup, Label, Input, InputGroup, InputGroupAddon, Tooltip } from "reactstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";

import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { API_URL } from "../../support/API_URL";
import { STORE_GET, ADD_PRODUCT_SUCCESS, RESET_PRODUCT } from "../../support/types";

export function AddProduct() {
  /**
   * ============================================= REDUX REDUCER =====
   */
  const dispatch = useDispatch();
  const State = useSelector(({ partner, product }) => {
    return {
      StoreId: partner.storeid,

      isRedirect: product.redirect,
      errorName: product.errorName
    };
  });
  const { StoreId, isRedirect, errorName } = State;

  useEffect(() => {
    dispatch({ type: RESET_PRODUCT });
    dispatch({ type: STORE_GET, payload: { storeid: StoreId } });
  }, [StoreId, dispatch]);

  /**
   * ===================================================== STATE =====
   */
  const [product, setProduct] = useState({});
  const [tooltipOpen, setTooltipOpen] = useState("");
  const toggleTooltip = id => setTooltipOpen(id);

  const [addImage, setImage] = useReducer((addImage, { type, value }) => {
    switch (type) {
      case "add":
        return addImage.length < 4 ? [...addImage, value] : addImage;
      case "remove":
        return addImage.filter((_, index) => index !== value);
      default:
        return addImage.filter(val => val);
    }
  }, []);

  const handleAddImage = images => {
    images.forEach(File => {
      setImage({ type: "add", value: File });
    });
  };

  const handleAddProduct = async () => {
    let formdata = new FormData();
    let options = {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    let newProduct = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      type: product.type,
      about: product.about
    };

    addImage.forEach(image => formdata.append("image", image));
    formdata.append("data", JSON.stringify(newProduct));

    try {
      let { data } = await Axios.post(`${API_URL}/product/add`, formdata, options);
      if (data.redirect) dispatch({ type: ADD_PRODUCT_SUCCESS });
    } catch (err) {
      toast.error("User not authorized!", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false
      });
      console.log(err);
    }
  };

  // console.log(isRedirect);
  // console.log(StoreId);

  if (isRedirect) {
    return <Redirect to="/partner/product" />;
  }
  return (
    <Fragment>
      <Form>
        <FormGroup id="form-name" row>
          <Label for="product_name" sm={2}>
            Product Name
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, name: e.target.value })}
              invalid={Boolean(errorName)}
              type="text"
              name="product_name"
              id="product_name"
              placeholder="input product name"
            />
            {errorName ? <FormFeedback className="float-left">{errorName}</FormFeedback> : null}
          </Col>
        </FormGroup>

        <FormGroup id="form-price" row>
          <Label for="product_price" sm={2}>
            Price
          </Label>
          <Col sm={10}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Rp</InputGroupAddon>
              <Input
                onChange={e => setProduct({ ...product, price: e.target.value })}
                name="product_price"
                id="product_price"
                placeholder="input price"
                min={0}
                max={100}
                type="number"
                step="1"
              />
              <InputGroupAddon addonType="append">.00</InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup id="form-stock" row>
          <Label for="product_stock" sm={2}>
            Stock
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, stock: e.target.value })}
              name="product_stock"
              id="product_stock"
              placeholder="input total stock"
              min={0}
              max={100}
              type="number"
              step="1"
            />
          </Col>
        </FormGroup>

        <FormGroup id="form-type" row>
          <Label for="product_type" sm={2}>
            Product type
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, type: e.target.value })}
              type="select"
              name="product_type"
              id="product_type">
              <option hidden>Select product type</option>
              <option>Chair</option>
              <option>Sofa</option>
              <option>Table</option>
              <option>Cabinet</option>
              <option>Bed</option>
              <option>Pillow</option>
              <option>Accesories</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup id="form-category" row>
          <Label for="product_category" sm={2}>
            Product Category
          </Label>
          <Col sm={10}>
            <CustomInput type="checkbox" id="product_category1" label="Bedroom" />
            <CustomInput type="checkbox" id="product_category2" label="Bathroom" />
            <CustomInput type="checkbox" id="product_category3" label="Dining Room" />
            <CustomInput type="checkbox" id="product_category4" label="Living Room" />
          </Col>
        </FormGroup>

        <FormGroup id="form-about" row>
          <Label for="product_about" sm={2}>
            About Product
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, about: e.target.value })}
              type="textarea"
              name="product_about"
              id="product_about"
            />
          </Col>
        </FormGroup>

        <FormGroup id="form-image" row>
          <Label sm={2}>Image</Label>
          <Col className="d-flex" sm={10}>
            <Input
              onChange={({ target }) => handleAddImage(Array.from(target.files))}
              id="product_image"
              className="add_product_input"
              multiple
              max={4}
              tabIndex="-1"
              accept="image/png, image/jpeg"
              type="file"
            />

            {addImage.length > 0 &&
              addImage.map((image, id) =>
                id <= 3 ? (
                  <Label sm={2} key={"label" + id} id={"image-" + id}>
                    <div key={"div" + id} className="add_product_preview">
                      <img
                        key={"img" + id}
                        onMouseEnter={() => toggleTooltip(id)}
                        onMouseLeave={() => toggleTooltip(-1)}
                        onClick={() => setImage({ type: "remove", value: id })}
                        src={URL.createObjectURL(image)}
                        className="plus_icon overflow-hidden"
                        alt=""
                      />
                    </div>

                    {addImage.length && id >= 0 ? (
                      <Tooltip
                        key={"tooltip" + id}
                        placement="top"
                        isOpen={id === tooltipOpen}
                        target={"image-" + id}
                        toggle={() => toggleTooltip(id)}>
                        {image.name} <br />
                        <b>Click to remove!</b>
                      </Tooltip>
                    ) : null}
                  </Label>
                ) : null
              )}

            {addImage.length < 4 && (
              <Label for="product_image" sm={2}>
                <div className="add_product_icon">
                  <MdAdd height="100%" className="plus_icon" />
                </div>
              </Label>
            )}
          </Col>
        </FormGroup>
      </Form>

      <div className="form-group d-flex">
        <div className="mx-auto">
          <a href="/partner/product" className="btn btn-outline-dark px-3 mr-3 ">
            Cancel
          </a>
          <button onClick={handleAddProduct} className="btn btn-secondary px-4">
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
}
