/* eslint-disable no-unused-vars */
import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { POST_TO_ORDERS_START, POST_TO_ORDERS, POST_TO_CART } from "../../support/types";

export const AddToOrder = () => {
  return async dispatch => {
    dispatch({ type: POST_TO_ORDERS_START });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.post(`${API_URL}/t/checkout`, null, options);
      setTimeout(() => {
        dispatch({ type: POST_TO_CART, payload: data.cart });
        dispatch({ type: POST_TO_ORDERS, payload: data.orders });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};
