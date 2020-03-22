/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, CustomInput, Form, FormFeedback, FormGroup, Label, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { API_URL } from "../../support/API_URL";
import { STORE_GET, ADD_PRODUCT_SUCCESS, GET_TYPES } from "../../support/types";
import { FetchTypes } from "../../redux/actions";

export function AddProduct({ history }) {
  /**
   * ============================================= REDUX REDUCER =====
   */
  const dispatch = useDispatch();
  const { StoreId, UserId, Username, Types, isRedirect, errorName } = useSelector(({ Store, User, Product }) => {
    return {
      StoreId: Store.storeid,

      UserId: User.id,
      Username: User.username,

      Types: Product.productTypes,
      isRedirect: Product.redirect,
      errorName: Product.errorName
    };
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(FetchTypes(token));
    }
  }, [dispatch]);

  /**
   * ===================================================== STATE =====
   */
  const [product, setProduct] = useState({});

  const [addImage, setImage] = useReducer((addImage, { type, payload }) => {
    switch (type) {
      case "add":
        return addImage.length < 4 ? [...addImage, payload] : addImage;
      case "remove":
        return addImage.filter((_, index) => index !== payload);
      default:
        return addImage.filter(val => val);
    }
  }, []);

  const handleAddImage = images => {
    images.forEach(File => {
      setImage({ type: "add", payload: File });
    });
  };

  async function handleAddProduct() {
    let formData = new FormData();
    let options = {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    let toasty = (msg, time = 5000, x = "error") => {
      if (x === "error") {
        toast.error(msg, {
          position: "bottom-right",
          autoClose: time,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true
        });
      } else {
        toast.success(msg, {
          position: "bottom-right",
          autoClose: time,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true
        });
      }
    };
    let newProduct = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      typeid: product.typeid,
      about: product.about
    };

    addImage.forEach(image => formData.append("image", image));
    formData.append("data", JSON.stringify(newProduct));

    if (!product.name) toasty("Insert product name!");
    else if (!product.price) toasty("Insert product price!");
    else if (!product.stock) toasty("Insert product stock!");
    else if (!product.typeid) toasty("Insert product type!");
    else if (!product.about) toasty("Insert product about!");
    else if (!addImage[0]) toasty("Insert product picture!");
    else
      try {
        let { data } = await Axios.post(`${API_URL}/product/add/${StoreId}`, formData, options);
        if (data.redirect) dispatch({ type: ADD_PRODUCT_SUCCESS });
        toasty("Add new product success!", 2000, "");
      } catch (err) {
        toasty("Add new product failed!", 2000);
        console.log(err);
      }
  }
  console.log(product);

  if (isRedirect) {
    return <Link to={() => history.goBack()} />;
  }
  return (
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
            min={1}
            max={500}
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
            onChange={e => setProduct({ ...product, typeid: parseInt(e.target.value) })}
            type="select"
            name="product_type"
            id="product_type">
            <option>=== Select product type ===</option>
            {Types.map(({ id, type }) => (
              <option value={id} key={id}>
                {type}
              </option>
            ))}
          </Input>
        </Col>
      </FormGroup>

      {/* <FormGroup id="form-category" row>
          <Label for="product_category" sm={2}>
            Product Category
          </Label>
          <Col sm={10}>
            <CustomInput type="checkbox" id="product_category1" label="Bedroom" />
            <CustomInput type="checkbox" id="product_category2" label="Bathroom" />
            <CustomInput type="checkbox" id="product_category3" label="Dining Room" />
            <CustomInput type="checkbox" id="product_category4" label="Living Room" />
          </Col>
        </FormGroup> */}

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
            accept="image/png, image/webp, image/jpeg"
            type="file"
          />

          {addImage.length > 0 &&
            addImage.map((image, id) =>
              id <= 3 ? (
                <Label sm={2} key={"label" + id}>
                  <div key={"div" + id} className="add_product_preview">
                    <img
                      key={"img" + id}
                      onClick={() => setImage({ type: "remove", payload: id })}
                      src={URL.createObjectURL(image)}
                      className="plus_icon"
                      alt=""
                    />
                  </div>
                  <small className="text-secondary">*click to remove</small>
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
          <div className="form-group d-flex mt-5 ml-3">
            <div className="mx-auto">
              <button onClick={handleAddProduct} className="btn btn-secondary mr-3 px-4">
                Add New
              </button>
              <Link to={`/p/${UserId}/${Username}/product`}>
                <button className="btn btn-outline-dark px-3">Cancel</button>
              </Link>
            </div>
          </div>
        </Col>
      </FormGroup>
    </Form>
  );
}
