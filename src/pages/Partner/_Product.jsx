/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import numeral from "numeral";
import Axios from "axios";

import { Spinner } from "../../components/Spinner";
import { API_URL } from "../../support/API_URL";
import {
  MODAL_IMAGES,
  MODAL_EDIT,
  GET_PRODUCT,
  GET_IMAGES,
  EDIT_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from "../../support/types";

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
  ModalFooter,
  Badge
} from "reactstrap";
import { MdAdd, MdFileUpload } from "react-icons/md";
import { FaRegImages, FaRegEdit, FaRegTrashAlt, FaArrowDown } from "react-icons/fa";
import { FetchProduct, FetchTypes, FetchImages } from "../../redux/actions";

export const Product = ({ match }) => {
  /**
   * ====================================================== REDUX REDUCER ====
   * Get the value from redux's reducer and desctructured it
   */
  const dispatch = useDispatch();
  const {
    UserId,
    Role,
    Username,
    Logout,
    StoreId,
    dataProduct,
    Types,
    ProductImages,
    ProductId,
    ProductName,
    openModalImage,
    onEdit
  } = useSelector(({ User, Store, Product }) => {
    return {
      UserId: User.id,
      Role: User.role,
      Username: User.username,
      Logout: User.logout,

      StoreId: Store.storeid,

      dataProduct: Product.dataProduct,
      Types: Product.productTypes,
      ProductImages: Product.productImages,

      ProductId: Product.productid,
      ProductName: Product.productname,
      openModalImage: Product.modalImages,
      onEdit: Product.onEdit
    };
  });

  /**
   * =========================================================== USE STATE ====
   */
  const Path = "http://localhost:2400";

  /**
   * =============================================== GET ALL DATA PRODUCTS ====
   * This useEffect trigger action to get all products from the same storeid
   * and set the result to dataProduct's state
   */
  useEffect(() => {
    dispatch(FetchProduct());
    dispatch(FetchTypes());
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
    dispatch(FetchImages(ProductId));
  }, [ProductId, dispatch]);

  function toggleModalImage() {
    dispatch({ type: MODAL_IMAGES });
  }

  /**
   * ============================================== ADD IMAGE FUNCTIONS ====
   */
  const [addImage, setAddImage] = useReducer((addImage, { type, payload }) => {
    switch (type) {
      case "add":
        return addImage.length < 4 - ProductImages.length ? [...addImage, payload] : addImage;
      case "remove":
        return addImage.filter((_, index) => index !== payload);
      case "reset":
        return [];
      default:
        return addImage.filter(val => val);
    }
  }, []);

  const handleAddImage = images => {
    images.forEach(File => {
      setAddImage({ type: "add", payload: File });
    });
  };

  /**
   * ============================================== DELETE IMAGE FUNCTIONS ====
   */
  function handleDeleteProductImage(imageid) {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    Swal.fire({
      toast: true,
      title: "Delete image from database?",
      icon: "warning",
      position: "center",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let { data } = await Axios.delete(`${API_URL}/product/delete/i/${imageid}`, options);
          dispatch({ type: GET_IMAGES, payload: data.result });
          setAddImage({ type: "reset" });
          console.log("deleted");
        } catch (err) {
          Swal.showValidationMessage(`Request failed: ${err}`);
        }
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
          dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.result });
          console.log("datadel", data.result);
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
          showConfirmButton: false,
          icon: "success"
        });
      } else {
        Swal.fire({
          toast: true,
          title: "Canceled!",
          position: "top-end",
          timer: 1000,
          showConfirmButton: false,
          icon: "error"
        });
      }
    });
  }

  /**
   * ================================================= EDIT DATA FUNCTIONS ====
   */
  const [editProduct, setEditProduct] = useState({ productid: 0, name: "", price: 0, stock: 0, type: "", about: "" });
  const onChangeEdit = ({ target }) => setEditProduct({ ...editProduct, [target.name]: target.value });
  const toggleModalEdit = () => {
    setAddImage({ type: "reset" });
    dispatch({ type: MODAL_EDIT, payload: [] });
  };

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

  const handleModalEdit = (id, productid, productname) => {
    setEditProduct(dataProduct[id]);
    dispatch({ type: MODAL_EDIT, payload: { productid, productname } });
  };

  function handleSaveEdit() {
    let formData = new FormData();
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    let editedData = {
      name: editProduct.name,
      price: editProduct.price,
      typeid: editProduct.typeid,
      stock: editProduct.stock,
      about: editProduct.about
    };

    addImage.forEach(image => formData.append("image", image));
    formData.append("data", JSON.stringify(editedData));

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
          let { data } = await Axios.post(`${API_URL}/product/edit/${ProductId}`, formData, options);
          data.products && dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data.products });
          data.images && dispatch({ type: GET_IMAGES, payload: data.images });
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
          showConfirmButton: false,
          onAfterClose: dispatch({ type: MODAL_EDIT })
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
   * ==================================================== MODAL COMPONENTS ====
   * Bunch of components would be put on here
   */
  const ModalImages = () => {
    return (
      <Modal toggle={toggleModalImage} autoFocus={false} size="lg" fade={false} centered isOpen={openModalImage}>
        <ModalHeader>{ProductImages.length ? `${ProductName}'s Images` : `No Product Images for ${ProductName}`}</ModalHeader>
        <ModalBody className="d-flex">
          <div className="mx-auto align-content-center">
            {ProductImages.length
              ? ProductImages.map((val, id) => {
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
                            {/* <FaRegTrashAlt /> */}
                          </span>
                        </div>
                      </Label>

                      {ProductImages.length && id >= 0 ? (
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
          </div>
        </ModalBody>
      </Modal>
    );
  };

  const RenderContentTable = () => {
    return dataProduct.length ? (
      dataProduct.map((product, id) => {
        return (
          <Fragment key={`product${product.productid}`}>
            <tr className="text-center">
              <td>{product.productid}</td>
              <td>
                <button
                  onClick={() => handleImage({ productid: product.productid, productname: product.name })}
                  className="btn btn-sm btn-secondary"
                  id={`imgprod-${id}`}>
                  <img src={`${Path + product.cover_image}`} style={{ width: "75px" }} alt="" />
                  {/* <FaRegImages /> */}
                </button>
              </td>

              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.type}</td>
              <td>Rp {numeral(product.price).format("0,0.00")}</td>
              {/* <td style={{ maxWidth: "200px" }}>{product.about}</td> */}
              <td>
                <button
                  onClick={() => handleModalEdit(id, product.productid, product.name)}
                  className="btn btn-sm btn-warning mr-1"
                  id={`editprod-${id}`}>
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.productid)}
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
    let { productid, storeid, name, stock, type, price, about } = editProduct;
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
                  <Input onChange={onChangeEdit} name="typeid" type="select">
                    <option hidden>{type}</option>
                    {Types.map(({ id, type }) => (
                      <option key={id} value={id}>
                        {type}
                      </option>
                    ))}
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
          </Fragment>
        </ModalBody>
        <ModalBody className="d-flex">
          <div className="mx-auto align-content-center">
            {ProductImages.length
              ? ProductImages.map((val, id) => {
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

                      {ProductImages.length && id >= 0 ? (
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

            {ProductImages.length < 4 && addImage.length > 0
              ? addImage.map((val, id) => {
                  return (
                    <Fragment key={id}>
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
                    </Fragment>
                  );
                })
              : null}

            {ProductImages.length >= 0 && ProductImages.length < 4 && addImage.length < 4 - ProductImages.length ? (
              <>
                <Input
                  onChange={({ target }) => handleAddImage(Array.from(target.files))}
                  id="add_product_image"
                  className="add_product_input"
                  multiple
                  max={4}
                  tabIndex="-1"
                  accept="image/png, image/jpeg, image/webp"
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
        <ModalFooter>
          <div className="form-group d-flex">
            <div className="mx-auto">
              <button onClick={handleSaveEdit} className="btn btn-outline-primary px-3 mr-3">
                Save
              </button>
              <button onClick={toggleModalEdit} className="btn btn-danger px-3">
                Cancel
              </button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    );
  };

  /**
   *  ======================== === R = E = N = D = E = R === ==================
   */
  if (!StoreId) {
    return <Spinner />;
  }
  if (Role !== "partner") {
    return <Redirect to="/" />;
  }
  return (
    <>
      {/*  ========================== COMPONENTS ========================== */}
      {ModalImages()}
      {ModalEdit()}

      <div id="page-content-wrapper">
        <div className="container-fluid w-100 table-product">
          <table className="table table-hover border-0">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                {/* <th scope="col">About</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{RenderContentTable()}</tbody>
          </table>
        </div>
        <div className="d-flex">
          <Link to={`${match.url}/add_product`} className="btn btn-outline-secondary btn-sm mx-auto mb-3">
            Add Product
          </Link>
        </div>
      </div>
    </>
  );
};
