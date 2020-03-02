/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Link, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import numeral from "numeral";
import Axios from "axios";

import { API_URL } from "../../support/API_URL";
import { STORE_GET, MODAL_PRODUCT, INSERT_PRODUCT, GET_PRODUCT } from "../../support/types";

import { MdAdd } from "react-icons/md";
import { Input, Modal, ModalHeader, ModalBody, Label, Tooltip } from "reactstrap";
import { FaRegImages, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const Product = () => {
  /**
   * ========================= REDUX REDUCER =========================
   * Get the value from redux's reducer and desctructured it
   */
  const dispatch = useDispatch();
  const State = useSelector(({ partner, product }) => {
    return {
      UserId: partner.id,
      StoreId: partner.storeid,

      dataProduct: product.dataProduct,
      ProductId: product.productid,
      ModalImage: product.modal
    };
  });
  const { dataProduct, ModalImage, StoreId, ProductId } = State;

  const productReducer = useSelector(({ product }) => {
    return {
      ProductId: product.productid,
      Name: product.name,
      Price: product.price,
      Stock: product.stock,
      Type: product.type,
      About: product.about
    };
  });

  /**
   * ========================= USE STATE =========================
   */
  const Path = "http://localhost:2400";
  const [productImage, setProductImage] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const toggleTooltip = (id, x) => setTooltipOpen({ ...tooltipOpen, id, x });

  /**
   * ===================== GET ALL DATA PRODUCTS ===================
   * This useEffect trigger Axios to get all products from the same store
   * and set the result to dataProduct's state
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get(`${API_URL}/product/get_products/${StoreId}`);
        dispatch({ type: GET_PRODUCT, payload: { dataProduct: data.result } });
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [StoreId, dispatch]);

  /**
   * ================= GET SINGLE PRODUCT'S IMAGES ==================
   * Function handleImage set productid sent from onClick to productid on redux's reducer
   *
   * Then, useEffect trigger Axios to get specific product based on productid
   * and set the result to productImage's state
   */
  const handleImage = productid => dispatch({ type: MODAL_PRODUCT, payload: productid });
  useEffect(() => {
    const fetchProduct = async () => {
      if (ProductId > 0) {
        try {
          const { data } = await Axios.get(`${API_URL}/product/get_images/${ProductId}`);
          setProductImage(data.result);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchProduct();
  }, [ProductId]);

  /**
   *
   *
   * ========================== FUNCTIONS ==========================
   */
  const handleDeleteProduct = async productid => {
    try {
      let { data } = await Axios.delete(`${API_URL}/product/delete/${StoreId}/${productid}`);
      dispatch({ type: GET_PRODUCT, payload: data.result });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(dataProduct);
  console.log(StoreId);
  return (
    <>
      {/**
       * =========================== MODAL COMPONENTS ===========================
       * well, this is for rendering product's image(s) through modal
       */}
      <Modal autoFocus={false} size={!productImage.length ? "sm" : "lg"} fade={false} centered isOpen={ModalImage}>
        <ModalHeader
          // toggle={() => dispatch({ type: MODAL_PRODUCT })}
          close={
            <button className="close" onClick={() => dispatch({ type: MODAL_PRODUCT })}>
              &times;
            </button>
          }
          //
        >
          {productImage.length ? "Product Images" : null}
        </ModalHeader>
        <ModalBody className="d-flex">
          {productImage.length ? (
            productImage.map((val, id) => {
              return (
                <div className="mx-auto" key={`product-img${id}`}>
                  <Label className="image_product_preview">
                    <div className="image_thumbnail" key={"divimg" + id}>
                      <img src={`${Path + val.image}`} alt="img" />
                    </div>
                    <div className="image-button">
                      <span
                        onMouseEnter={() => toggleTooltip(id, "editimg")}
                        onMouseLeave={() => toggleTooltip(-1)}
                        id={"editimg-" + id}>
                        <FaRegEdit />
                      </span>
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
                        placement="bottom"
                        fade={false}
                        isOpen={id === tooltipOpen.id && tooltipOpen.x === "editimg"}
                        target={"editimg-" + id}>
                        click to edit!
                      </Tooltip>
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
                </div>
              );
            })
          ) : (
            <p>No Images Available</p>
          )}
        </ModalBody>
      </Modal>

      {/**
       * ===================== === R = E = N = D = E = R === =====================
       */}
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
            <tbody>
              {dataProduct.length ? (
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
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// (
//   <Fragment>
//     <Input
//       onChange={({ target }) => handleAddImage(Array.from(target.files))}
//       id="product_image"
//       className="add_product_input"
//       multiple
//       max={4}
//       accept="image/png, image/jpeg"
//       type="file"
//     />

//     {addImage.length
//       ? addImage.map((image, id) =>
//           id <= 3 ? (
//             <Label
//               key={"label" + id}
//               className="image_product_preview"
//               onMouseEnter={() => toggleTooltip(id, "")}
//               onMouseLeave={() => toggleTooltip(-1, "")}
//               id={"image-" + id}>
//               <div className="image_thumbnail" key={"image-" + id}>
//                 <img
//                   key={"img" + id}
//                   onClick={() => setImage({ type: "remove", value: id })}
//                   src={URL.createObjectURL(image)}
//                   alt=""
//                 />
//               </div>

//               {addImage.length && id >= 0 ? (
//                 <Fragment key={"tooltip" + id}>
//                   <Tooltip placement="bottom" fade={false} isOpen={id === tooltipOpen.id} target={"image-" + id}>
//                     <b>Click to remove!</b>
//                   </Tooltip>
//                 </Fragment>
//               ) : null}
//             </Label>
//           ) : null
//         )
//       : null}

//     {addImage.length < 4 && (
//       <Label for="product_image">
//         <div id="zsdad" className="add_product_icon">
//           <MdAdd height="100%" className="plus_icon" />
//         </div>
//       </Label>
//     )}
//   </Fragment>
// )
