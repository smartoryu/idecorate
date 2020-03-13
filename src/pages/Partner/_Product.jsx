/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import numeral from "numeral";
import Axios from "axios";

import { Spinner } from "../../components/Spinner";
import { API_URL } from "../../support/API_URL";
import { MODAL_IMAGES, MODAL_EDIT, GET_PRODUCT, EDIT_SUCCESS } from "../../support/types";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  UncontrolledTooltip,
  Tooltip,
  ModalFooter
} from "reactstrap";
import { MdAdd, MdFileUpload } from "react-icons/md";
import { FaRegImages, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const Product = ({ match }) => {
  /**
   * ====================================================== REDUX REDUCER ====
   * Get the value from redux's reducer and desctructured it
   */
  const dispatch = useDispatch();
  const State = useSelector(({ User, Store, Product }) => {
    return {
      UserId: User.id,
      StoreId: Store.storeid,

      dataProduct: Product.dataProduct,
      ProductId: Product.productid,
      ProductName: Product.productname,

      openModalImage: Product.modalImages,
      onEdit: Product.onEdit
    };
  });
  const { dataProduct, openModalImage, onEdit, StoreId, ProductId, ProductName } = State;

  /**
   * =========================================================== USE STATE ====
   */
  const Path = "http://localhost:2400";
  const [productImage, setProductImage] = useState([]);

  const [editProduct, setEditProduct] = useState({ productid: 0, name: "", price: 0, stock: 0, type: "", about: "" });
  const onChangeEdit = ({ target }) => setEditProduct({ ...editProduct, [target.name]: target.value });

  /**
   * =============================================== GET ALL DATA PRODUCTS ====
   * This useEffect trigger Axios to get all products from the same store
   * and set the result to dataProduct's state
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
        const { data } = await Axios.get(`${API_URL}/product/get_products`, options);
        dispatch({ type: GET_PRODUCT, payload: data.result });
      } catch (err) {
        toast.error("User not authorized!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: true,
          closeButton: false
        });
      }
    };
    fetchProducts();
  }, [dispatch]);

  /**
   * ====================================== MANAGE SINGLE PRODUCT'S IMAGES ====
   * Function handleImage set productid sent from onClick to productid on redux's reducer
   * Then, useEffect trigger Axios to get specific product based on productid
   * and set the result to productImage's state
   *
   * Below that is the Edit Image Section
   */
  const handleImage = ({ productid, productname }) => dispatch({ type: MODAL_IMAGES, payload: { productid, productname } });
  useEffect(() => {
    const fetchImages = async productid => {
      if (productid > 0) {
        try {
          let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
          const { data } = await Axios.get(`${API_URL}/product/get_images/${productid}`, options);
          setProductImage(data.result);
        } catch (err) {
          toast.error("User not authorized!", {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: true,
            closeButton: false
          });
        }
      }
    };
    fetchImages(ProductId);
  }, [ProductId]);

  function toggleModalImage() {
    dispatch({ type: MODAL_IMAGES });
  }

  /**
   * ============================================== ADD IMAGE FUNCTIONS ====
   */
  const addImageDefault = [];
  const [addImage, setAddImage] = useReducer((addImage = addImageDefault, { type, payload }) => {
    switch (type) {
      case "add":
        return addImage.length < 4 - productImage.length ? [...addImage, payload] : addImage;
      case "remove":
        return addImage.filter((_, index) => index !== payload);
      case "reset":
        return addImageDefault;
      default:
        return addImage.filter(val => val);
    }
  }, []);

  const errToast = (msg, time = 5000, x = "error") => {
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

  function handleAddImage() {
    let formData = new FormData();
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    addImage.forEach(image => formData.append("image", image));
    Swal.fire({
      toast: true,
      title: "Save the changes?",
      icon: "warning",
      position: "bottom",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let { data } = await Axios.post(`${API_URL}/product/add-image/${ProductId}`, formData, options);
          setProductImage(data.result);
          setAddImage({ type: "reset" });
        } catch (error) {
          errToast("Add new product failed!", 2000);
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          toast: true,
          title: "Saved!",
          position: "center",
          timer: 1000,
          icon: "success",
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          toast: true,
          title: "Canceled!",
          position: "center",
          timer: 1000,
          icon: "error",
          showConfirmButton: false
        });
      }
    });
  }

  /**
   * ============================================== DELETE IMAGE FUNCTIONS ====
   */
  function handleDeleteProductImage(imageid) {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    Swal.fire({
      toast: true,
      title: "Delete image from database?",
      icon: "warning",
      position: "bottom",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let { data } = await Axios.delete(`${API_URL}/product/delete/i/${imageid}`, options);
          setProductImage(data.result);
          // dispatch({ type: GET_PRODUCT, payload: { dataProduct: data.result } });
        } catch (err) {
          Swal.showValidationMessage(`Request failed: ${err}`);
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          toast: true,
          title: "Deleted!",
          position: "bottom",
          timer: 1000,
          icon: "success",
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          toast: true,
          title: "Canceled!",
          position: "bottom",
          timer: 1000,
          icon: "error",
          showConfirmButton: false
        });
      }
    });
  }
  /**
   * ============================================ DELETE PRODUCT FUNCTIONS ====
   */
  function handleDeleteProduct(productid) {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    Swal.fire({
      toast: true,
      // title: <span style={{ color: "tomato" }}>Delete product?</span>,
      title: "Delete product?",
      icon: "warning",
      position: "top-end",
      background: "#e8e8e8",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let { data } = await Axios.delete(`${API_URL}/product/delete/p/${productid}`, options);
          if (data.status !== "error") dispatch({ type: GET_PRODUCT, payload: { dataProduct: data.result } });
        } catch (err) {
          Swal.showValidationMessage(`Request failed: ${err}`);
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          toast: true,
          title: "Deleted!",
          position: "top-end",
          timer: 1000,
          icon: "success",
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          toast: true,
          title: "Canceled!",
          position: "top-end",
          timer: 1000,
          icon: "error",
          showConfirmButton: false
        });
      }
    });
  }

  /**
   * ================================================= EDIT DATA FUNCTIONS ====
   */
  const handleModalEdit = (id, productid, productname) => {
    setEditProduct(dataProduct[id]);
    dispatch({ type: MODAL_EDIT, payload: { productid, productname } });
  };
  const toggleModalEdit = () => dispatch({ type: MODAL_EDIT, payload: [] });
  async function handleSaveEdit() {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    let { productid, name, price, stock, type, about } = editProduct;

    try {
      let { data } = await Axios.put(`${API_URL}/product/edit`, { editProduct }, options);
      dispatch({ type: EDIT_SUCCESS });
      dispatch({ type: GET_PRODUCT, payload: data.result });
    } catch (error) {
      errToast("Edit product failed!", 2000);
      console.log(error);
    }
  }
  /**
   * ==================================================== MODAL COMPONENTS ====
   * Bunch of components would be put on here
   */
  const ModalImages = () => {
    return (
      <Modal
        autoFocus={false}
        // size={productImage.length < 0 ? "sm" : productImage.length < 2 ? "md" : "lg"}
        size="lg"
        fade={false}
        centered
        isOpen={openModalImage}>
        <ModalHeader>{productImage.length ? `${ProductName}'s Images` : `No Product Images for ${ProductName}`}</ModalHeader>
        <ModalBody className="d-flex">
          <div className="mx-auto align-content-center">
            {productImage.length
              ? productImage.map((val, id) => {
                  return (
                    <Fragment key={`product-img${id}`}>
                      <Label className="image_product_preview">
                        <div className="image_thumbnail" key={"divimg" + id}>
                          <a href={`${Path + val.image}`} rel="noopener noreferrer" target="_blank">
                            <img src={`${Path + val.image}`} alt="img" />
                          </a>
                        </div>
                        <div className="image-button">
                          <span onClick={() => handleDeleteProductImage(val.imageid)} id={"delimg-" + id}>
                            <FaRegTrashAlt />
                          </span>
                        </div>
                      </Label>

                      {productImage.length && id >= 0 ? (
                        <Fragment key={`tooltip-img${id}`}>
                          <UncontrolledTooltip key={"delimg-" + id} placement="bottom" fade={false} target={"delimg-" + id}>
                            click to remove!
                          </UncontrolledTooltip>
                        </Fragment>
                      ) : null}
                    </Fragment>
                  );
                })
              : null}

            {productImage.length < 4 && addImage.length > 0
              ? addImage.map((val, id) => {
                  return (
                    <>
                      <Label className="image_product_preview">
                        <div style={{ border: "1px solid green" }} className="image_thumbnail" key={"divAddImg" + id}>
                          <img id={"srcAddImg-" + id} src={URL.createObjectURL(val)} alt="img" />
                        </div>
                        <div className="image-button">
                          <span onClick={() => setAddImage({ type: "remove", payload: id })} id={"delAddImg-" + id}>
                            <FaRegTrashAlt />
                          </span>
                        </div>
                      </Label>

                      {addImage.length > 0 && id >= 0 && (
                        <Fragment key={`tooltip-addImg${id}`}>
                          <UncontrolledTooltip
                            key={"toolSrcAddImg-" + id}
                            placement="bottom"
                            fade={false}
                            target={"srcAddImg-" + id}>
                            Not yet uploaded!
                          </UncontrolledTooltip>
                          <UncontrolledTooltip
                            key={"toolDelAddImg-" + id}
                            placement="bottom"
                            fade={false}
                            target={"delAddImg-" + id}>
                            click to remove!
                          </UncontrolledTooltip>
                        </Fragment>
                      )}
                    </>
                  );
                })
              : null}

            {productImage.length >= 0 && productImage.length < 4 && addImage.length < 4 - productImage.length ? (
              <>
                <Input
                  onChange={({ target }) => setAddImage({ type: "add", payload: target.files[0] })}
                  id="add_product_image"
                  className="add_product_input"
                  tabIndex="-1"
                  accept="image/png, image/jpeg"
                  type="file"
                />

                <Label for="add_product_image" className="image_product_preview">
                  <div className="add_product_icon">
                    <MdAdd height="100%" className="plus_icon" />
                  </div>
                  <div className="image-button-add">
                    <span id="image-button-add-icon">
                      <MdFileUpload />
                    </span>
                  </div>
                </Label>

                <UncontrolledTooltip placement="bottom" fade={false} target={"image-button-add-icon"}>
                  click to add!
                </UncontrolledTooltip>
              </>
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter style={{ height: "fit-content" }}>
          {addImage.length ? (
            <button onClick={handleAddImage} className="btn btn-sm btn-success mr-3">
              Save
            </button>
          ) : (
            <button onClick={toggleModalImage} className="btn btn-sm btn-warning mr-3">
              Close
            </button>
          )}
        </ModalFooter>
      </Modal>
    );
  };

  const RenderContentTable = () => {
    return dataProduct.length ? (
      dataProduct.map((val, id) => {
        return (
          <Fragment key={`product${val.productid}`}>
            <tr className="text-center">
              <td>{val.productid}</td>
              <td>
                <button
                  onClick={() => handleImage({ productid: val.productid, productname: val.name })}
                  className="btn btn-sm btn-secondary"
                  id={`imgprod-${id}`}>
                  <FaRegImages />
                </button>
              </td>

              <td>{val.name}</td>
              <td>{val.stock}</td>
              <td>Rp {numeral(val.price).format("0,0.00")}</td>
              <td style={{ maxWidth: "200px" }}>{val.about}</td>
              <td>
                <button
                  onClick={() => handleModalEdit(id, val.productid, val.name)}
                  className="btn btn-sm btn-warning mr-1"
                  id={`editprod-${id}`}>
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(val.productid)}
                  className="btn btn-sm btn-primary ml-1"
                  id={`delprod-${id}`}>
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>

            {id >= 0 ? (
              <Fragment key={`tootltip-product${id}`}>
                <UncontrolledTooltip placement="bottom" fade={false} target={`imgprod-${id}`}>
                  click to open images!
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" fade={false} target={`editprod-${id}`}>
                  click to edit!
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" fade={false} target={`delprod-${id}`}>
                  click to remove!
                </UncontrolledTooltip>
              </Fragment>
            ) : null}
          </Fragment>
        );
      })
    ) : (
      <tr className="text-center">
        <td colSpan="7">Product not available</td>
      </tr>
    );
  };

  const ModalEdit = () => {
    let { productid, name, price, stock, type, about } = editProduct;
    return (
      <Modal autoFocus={false} size="lg" fade={false} centered isOpen={onEdit}>
        <ModalHeader toggle={toggleModalEdit}>{`Edit Data ${ProductName}`}</ModalHeader>
        <ModalBody>
          <Fragment>
            <Form>
              {/* =============== START OF FORM INPUT SECTION =============== */}
              <FormGroup id="form-name" row>
                <Label sm={3}>Product Name</Label>
                <Col sm={9}>
                  <Input onChange={onChangeEdit} type="text" name="name" defaultValue={name} />
                </Col>
              </FormGroup>

              <FormGroup id="form-price" row>
                <Label sm={3}>Price</Label>
                <Col sm={9}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Rp</InputGroupAddon>
                    <Input onChange={onChangeEdit} name="price" defaultValue={price} min={0} max={100} type="number" step="1" />
                    <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup id="form-stock" row>
                <Label sm={3}>Stock</Label>
                <Col sm={9}>
                  <Input onChange={onChangeEdit} name="stock" defaultValue={stock} min={0} max={100} type="number" step="1" />
                </Col>
              </FormGroup>

              <FormGroup id="form-type" row>
                <Label sm={3}>Product type</Label>
                <Col sm={9}>
                  <Input onChange={onChangeEdit} name="type" defaultValue={type} type="select">
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

              <FormGroup id="form-about" row>
                <Label sm={3}>About Product</Label>
                <Col sm={9}>
                  <Input onChange={onChangeEdit} name="about" defaultValue={about} type="textarea" />
                </Col>
              </FormGroup>

              {/*  */}
              {/* =============== END OF FORM INPUT SECTION =============== */}
            </Form>

            <div className="form-group d-flex">
              <div className="mx-auto">
                <button onClick={toggleModalEdit} className="btn btn-outline-dark px-3 mr-3 ">
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="btn btn-secondary px-4">
                  Save
                </button>
              </div>
            </div>
          </Fragment>
        </ModalBody>
      </Modal>
    );
  };

  /**
   *  ======================== === R = E = N = D = E = R === ==================
   */
  if (!StoreId) {
    return <Spinner />;
  }
  return (
    <>
      {/*  ========================== COMPONENTS ========================== */}
      {ModalImages()}
      {ModalEdit()}

      <div id="page-content-wrapper">
        <div className="d-flex">
          <Link to={`${match.url}/add_product`} className="btn btn-outline-secondary btn-sm mx-auto mb-3">
            Add Product
          </Link>
        </div>
        <div className="container-fluid w-100 pr-0">
          <table className="table table-hover">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">About</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{RenderContentTable()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};
