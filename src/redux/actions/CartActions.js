import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { POST_TO_CART_START, GET_P_DETAILS, POST_TO_CART, DELETE_CART_START, UPDATE_QTY_SUCCESS } from "../../support/types";

export const AddToCart = ({ postProduct }) => {
  return async dispatch => {
    dispatch({ type: POST_TO_CART_START });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      const { data } = await Axios.post(`${API_URL}/cart/post`, postProduct, options);
      setTimeout(() => {
        dispatch({ type: GET_P_DETAILS, payload: data.details });
        dispatch({ type: POST_TO_CART, payload: data.result });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteFromCart = transdetailsid => {
  return async dispatch => {
    dispatch({ type: POST_TO_CART_START });
    dispatch({ type: DELETE_CART_START });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.delete(`${API_URL}/cart/delete/${transdetailsid}`, options);
      setTimeout(() => {
        dispatch({ type: POST_TO_CART, payload: data.result });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};

export const UpdateCartItem = ({ transdetailsid, putData }) => {
  return async dispatch => {
    dispatch({ type: POST_TO_CART_START });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.put(`${API_URL}/cart/update/${transdetailsid}`, putData, options);
      setTimeout(() => {
        dispatch({ type: UPDATE_QTY_SUCCESS, payload: data.result });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};
