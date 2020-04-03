import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { PUT_PAYMENT_START, POST_MOD_ORDERS, POST_MOD_ORDER_ITEMS } from "../../support/types";

export const PutPaymentToConfirmed = ({ id }) => {
  return async dispatch => {
    dispatch({ type: PUT_PAYMENT_START, payload: id });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.put(`${API_URL}/mod/payment/confirm/${id}`, null, options);
      setTimeout(() => {
        dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
        dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};

export const PutPaymentToPaid = ({ id }) => {
  return async dispatch => {
    dispatch({ type: PUT_PAYMENT_START, payload: id });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.put(`${API_URL}/mod/payment/cancel/${id}`, null, options);
      setTimeout(() => {
        dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
        dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};
