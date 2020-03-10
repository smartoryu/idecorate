/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import numeral from "numeral";
import Axios from "axios";

import { Spinner } from "../../components/Spinner";
import { API_URL } from "../../support/API_URL";
import { MODAL_IMAGES, MODAL_EDIT, GET_PRODUCT } from "../../support/types";

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
  Tooltip
} from "reactstrap";
import { MdAdd, MdFileUpload } from "react-icons/md";
import { FaRegImages, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const Product = () => {
  /**
   * ====================================================== REDUX REDUCER ====
   * Get the value from redux's reducer and desctructured it
   */
  const dispatch = useDispatch();
  const State = useSelector(({ partner, product }) => {
    return {
      UserId: partner.id,
      StoreId: partner.storeid,

      dataProduct: product.dataProduct,
      ProductId: product.productid,

      openModalImage: product.modalImages,
      onEdit: product.onEdit
    };
  });
  const { dataProduct, openModalImage, onEdit, StoreId, ProductId } = State;

  /**
   * =========================================================== USE STATE ====
   */
  const Path = "http://localhost:2400";
  const [productImage, setProductImage] = useState([]);

  const [editProduct, setEditProduct] = useState({ productid: 0, name: "", price: 0, stock: 0, type: "", about: "" });
  const onChangeEdit = ({ target }) => setEditProduct({ ...editProduct, [target.name]: target.value });

  const [tooltipOpen, setTooltipOpen] = useState({ id: -1, x: "" });
  const toggleTooltip = (id, x) => setTooltipOpen({ ...tooltipOpen, id, x });

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
        dispatch({ type: GET_PRODUCT, payload: { dataProduct: data.result } });
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
  const handleImage = productid => dispatch({ type: MODAL_IMAGES, payload: productid });
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
    console.log("getimg");
    fetchImages(ProductId);
  }, [ProductId]);

  const toggleModalImage = () => {
    dispatch({ type: MODAL_IMAGES, payload: 0 });
    // Swal.fire({
    //   toast: true,
    //   title: "Save the changes?",
    //   icon: "warning",
    //   position: "bottom",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Save"
    // }).then(result => {
    //   if (result.value) {
    //     Swal.fire({
    //       toast: true,
    //       title: "Saved!",
    //       position: "bottom",
    //       timer: 1000,
    //       icon: "success",
    //       onAfterClose: () => dispatch({ type: MODAL_IMAGES, payload: 0 }),
    //       showConfirmButton: false
    //     });
    //   } else {
    //     Swal.fire({
    //       toast: true,
    //       title: "Canceled!",
    //       position: "bottom",
    //       timer: 1000,
    //       icon: "error",
    //       showConfirmButton: false
    //     });
    //   }
    // });
  };

  /**
   * ==================================================== DELETE FUNCTIONS ====
   */
  const handleDeleteProduct = productid => {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    Swal.fire({
      toast: true,
      title: "Delete product?",
      icon: "warning",
      position: "bottom",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let { data } = await Axios.delete(`${API_URL}/product/delete/${productid}`, options);
          if (data.status !== "error") dispatch({ type: GET_PRODUCT, payload: { dataProduct: data.result } });
        } catch (err) {
          Swal.showValidationMessage(`Request failed: ${err}`);
          // toast.error("User not authorized!", {
          //   position: "bottom-left",
          //   autoClose: 1000,
          //   hideProgressBar: true,
          //   closeButton: false
          // });
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

    // try {
    //   let { data } = await Axios.delete(`${API_URL}/product/delete/${productid}`, options);
    //   if (data.status !== "error") dispatch({ type: GET_PRODUCT, payload: { dataProduct: data.result } });
    // } catch (err) {
    //   toast.error("User not authorized!", {
    //     position: "bottom-left",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeButton: false
    //   });
    //   console.log(err.message);
    // }
  };

  /**
   * ================================================= EDIT DATA FUNCTIONS ====
   */
  const handleModalEdit = (id, productid) => {
    setEditProduct(dataProduct[id]);
    dispatch({ type: MODAL_EDIT, payload: productid });
  };
  const toggleModalEdit = () => dispatch({ type: MODAL_EDIT, payload: 0 });

  /**
   * ==================================================== MODAL COMPONENTS ====
   * Bunch of components would be put on here
   */
  const ModalImages = () => {
    return (
      <Modal
        autoFocus={false}
        size={productImage.length < 1 ? "sm" : productImage.length < 2 ? "md" : "lg"}
        fade={false}
        centered
        isOpen={openModalImage}>
        <ModalHeader toggle={toggleModalImage}>{productImage.length ? "Product Images" : null}</ModalHeader>
        <ModalBody className="d-flex">
          <div className="mx-auto align-content-center">
            {productImage.length ? (
              productImage.map((val, id) => {
                return (
                  <>
                    <Label className="image_product_preview" key={`product-img${id}`}>
                      <div className="image_thumbnail" key={"divimg" + id}>
                        <a href={`${Path + val.image}`} rel="noopener noreferrer" target="_blank">
                          <img src={`${Path + val.image}`} alt="img" />
                        </a>
                      </div>
                      <div className="image-button">
                        <span
                          onMouseEnter={() => toggleTooltip(id, "delimg")}
                          onMouseLeave={() => toggleTooltip(-1)}
                          id={"delimg-" + id}>
                          <FaRegTrashAlt />
                        </span>
                      </div>
                    </Label>

                    {productImage.length && id >= 0 ? (
                      <Fragment key={`tooltip-img${id}`}>
                        <Tooltip
                          key={"delimg-" + id}
                          placement="bottom"
                          fade={false}
                          isOpen={id === tooltipOpen.id && tooltipOpen.x === "delimg"}
                          target={"delimg-" + id}>
                          click to remove!
                        </Tooltip>
                      </Fragment>
                    ) : null}
                  </>
                );
              })
            ) : (
              <p>No Images Available</p>
            )}

            {productImage.length > 0 && productImage.length < 4 ? (
              <>
                <Label className="image_product_preview">
                  <div className="add_product_icon">
                    <MdAdd height="100%" className="plus_icon" />
                    {/* <img src={`${Path + productImage[0].image}`} alt="img" /> */}
                  </div>
                  <div className="image-button-add">
                    <span
                      onMouseEnter={() => toggleTooltip(0, "image-button-add-icon")}
                      onMouseLeave={() => toggleTooltip(-1)}
                      id="image-button-add-icon">
                      <MdFileUpload />
                    </span>
                  </div>
                </Label>

                <Tooltip
                  placement="bottom"
                  fade={false}
                  isOpen={tooltipOpen.x === "image-button-add-icon"}
                  target={"image-button-add-icon"}>
                  click to add!
                </Tooltip>
              </>
            ) : null}
          </div>
        </ModalBody>
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
                  onClick={() => handleImage(val.productid)}
                  onMouseEnter={() => toggleTooltip(id, "imgprod")}
                  onMouseLeave={() => toggleTooltip(-1)}
                  className="btn btn-sm btn-secondary"
                  id={`imgprod-${id}`}>
                  <FaRegImages />
                </button>
              </td>

              <td>{val.name}</td>
              <td>stok</td>
              <td>Rp {numeral(val.price).format("0,0.00")}</td>
              <td style={{ maxWidth: "200px" }}>{val.about}</td>
              <td>
                <button
                  onMouseEnter={() => toggleTooltip(id, "editprod")}
                  onMouseLeave={() => toggleTooltip(-1)}
                  onClick={() => handleModalEdit(id, val.productid)}
                  className="btn btn-sm btn-warning mr-1"
                  id={`editprod-${id}`}>
                  <FaRegEdit />
                </button>
                <button
                  onMouseEnter={() => toggleTooltip(id, "delprod")}
                  onMouseLeave={() => toggleTooltip(-1)}
                  onClick={() => handleDeleteProduct(val.productid)}
                  className="btn btn-sm btn-primary ml-1"
                  id={`delprod-${id}`}>
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>

            {id >= 0 ? (
              <Fragment key={`tootltip-product${id}`}>
                <Tooltip
                  placement="bottom"
                  fade={false}
                  isOpen={id === tooltipOpen.id && tooltipOpen.x === "imgprod"}
                  target={`imgprod-${id}`}>
                  click to open images!
                </Tooltip>
                <Tooltip
                  placement="bottom"
                  fade={false}
                  isOpen={id === tooltipOpen.id && tooltipOpen.x === "editprod"}
                  target={`editprod-${id}`}>
                  click to edit!
                </Tooltip>
                <Tooltip
                  placement="bottom"
                  fade={false}
                  isOpen={id === tooltipOpen.id && tooltipOpen.x === "delprod"}
                  target={`delprod-${id}`}>
                  click to remove!
                </Tooltip>
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
      <Modal autoFocus={false} size="lg" fade={false} centered onKeyPress isOpen={onEdit}>
        <ModalHeader toggle={toggleModalEdit}>{`Edit Data ${name}`}</ModalHeader>
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
                  <Input onChange={onChangeEdit} name="product_about" defaultValue={about} type="textarea" />
                </Col>
              </FormGroup>
              {/* 
              <FormGroup id="form-image" row>
                <Label sm={2}>Image</Label>
                <Col className="d-flex" sm={10}>
                  <Input
                    // onChange={({ target }) => handleAddImage(Array.from(target.files))}
                    className="add_product_input"
                    tabIndex="-1"
                    accept="image/png, image/jpeg"
                    type="file"
                  />

                  {productImage.length > 0 &&
                    productImage.map((image, id) =>
                      id <= 3 ? (
                        <Label sm={2} key={"label" + id} id={"image-" + id}>
                          <div key={"div" + id} className="add_product_preview">
                            <img
                              key={"img" + id}
                              onMouseEnter={() => toggleTooltip(id)}
                              onMouseLeave={() => toggleTooltip(-1)}
                              // onClick={() => setImage({ type: "remove", value: id })}
                              // src={URL.createObjectURL(image)}
                              src={`${Path + image.image}`}
                              className="plus_icon overflow-hidden"
                              // className="plus_icon overflow-hidden"
                              alt=""
                            />
                          </div>

                          {productImage.length && id >= 0 ? (
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
                </Col>
              </FormGroup> */}

              {/*  */}
              {/* =============== END OF FORM INPUT SECTION =============== */}
            </Form>

            <div className="form-group d-flex">
              <div className="mx-auto">
                <button onClick={toggleModalEdit} className="btn btn-outline-dark px-3 mr-3 ">
                  Cancel
                </button>
                <button className="btn btn-secondary px-4">Save</button>
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
          <Link to="/partner/add_product" className="btn btn-outline-secondary btn-sm mx-auto mb-3">
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
