/* eslint-disable no-unused-vars */
import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { POST_TO_ORDERS_START, POST_TO_ORDERS, POST_TO_CART, GET_ORDERS, POST_TO_ORDER_ITEMS } from "../../support/types";
import Swal from "sweetalert2";

export const GetOrderList = () => {
  return async dispatch => {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.get(`${API_URL}/order/get`, options);
      dispatch({ type: GET_ORDERS, payload: data.order });
      dispatch({ type: POST_TO_ORDER_ITEMS, payload: data.orderItems });
    } catch (err) {
      console.log(err);
    }
  };
};

export const AddToOrder = () => {
  return async dispatch => {
    dispatch({ type: POST_TO_ORDERS_START });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.post(`${API_URL}/order/post`, null, options);
      setTimeout(() => {
        dispatch({ type: POST_TO_CART, payload: data.cart });
        dispatch({ type: POST_TO_ORDERS, payload: data.orders });
        dispatch({ type: POST_TO_ORDER_ITEMS, payload: data.orderItems });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};

export const PostReceipt = ({ invoice, id }) => {
  return async dispatch => {
    const reader = new FileReader();
    let formData = new FormData();
    let options = {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const { value: file } = await Swal.fire({
      toast: true,
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture"
      }
    });

    if (file) {
      let Invoice = invoice.split("/").join("");
      console.log(Invoice);
      formData.append("image", file);
      try {
        let { data } = await Axios.post(`${API_URL}/order/post/${id}/receipt/${Invoice}`, formData, options);
        dispatch({ type: POST_TO_ORDERS, payload: data.orders });
        dispatch({ type: POST_TO_ORDER_ITEMS, payload: data.orderItems });
        reader.onload = e => {
          Swal.fire({
            title: "Payment Receipt Uploaded",
            imageUrl: e.target.result,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "The uploaded picture"
          });
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export const DeleteReceipt = ({ image, id }) => {
  return async dispatch => {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    Swal.fire({
      text: "Payment Receipt",
      imageUrl: `${API_URL + image}`,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Payment receipt image",
      showCancelButton: true,
      cancelButtonText: "Close",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
      preConfirm: async () => {
        try {
          let { data } = await Axios.delete(`${API_URL}/order/delete/receipt/${id}`, options);
          if (data.message) {
            Swal.showValidationMessage(data.message);
          } else {
            dispatch({ type: POST_TO_ORDERS, payload: data.orders });
            dispatch({ type: POST_TO_ORDER_ITEMS, payload: data.orderItems });
          }
        } catch (err) {
          Swal.showValidationMessage(`Request failed: ${err}`);
        }
      }
    });
  };
};
