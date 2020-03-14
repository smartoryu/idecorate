/* eslint-disable no-unused-vars */
import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import {
  ADD_PRODUCT_SUCCESS,
  EMPTY_PRODUCT_NAME,
  EMPTY_PRODUCT_PRICE,
  RESET_PRODUCT,
  MODAL_IMAGES,
  MODAL_EDIT,
  INSERT_PRODUCT,
  GET_PRODUCT,
  EDIT_SUCCESS,
  GET_TYPES,
  GET_IMAGES
} from "../../support/types";
import { toast } from "react-toastify";

const token = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

export const FetchProduct = () => {
  return async dispatch => {
    try {
      const { data } = await Axios.get(`${API_URL}/product/get_products`, token);
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
};

export const FetchTypes = () => {
  return async dispatch => {
    try {
      const { data } = await Axios.get(`${API_URL}/product/get_types`, token);
      dispatch({ type: GET_TYPES, payload: data.result });
    } catch (err) {
      toast.error("User not authorized!", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false
      });
    }
  };
};

export const FetchImages = productid => {
  return async dispatch => {
    if (productid > 0) {
      try {
        const { data } = await Axios.get(`${API_URL}/product/get_images/${productid}`, token);
        dispatch({ type: GET_IMAGES, payload: data.result });
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
};
