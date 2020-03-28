import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { toast } from "react-toastify";
import {
  PUT_PAYMENT_START,
  POST_MOD_ORDERS,
  POST_MOD_ORDER_ITEMS,
  POST_MOD_CONFIRMED_ORDER,
  PICK_ORDER_START
} from "../../support/types";

export const PutPaymentToConfirmed = ({ id }) => {
  return async dispatch => {
    dispatch({ type: PUT_PAYMENT_START, payload: id });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.put(`${API_URL}/mod/payment/confirm/${id}`, null, options);
      setTimeout(() => {
        dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
        dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
        dispatch({ type: POST_MOD_CONFIRMED_ORDER, payload: data.confirmedOrders });
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
        dispatch({ type: POST_MOD_CONFIRMED_ORDER, payload: data.confirmedOrders });
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
};

export const PickOrderToProccess = ({ id }) => {
  return async dispatch => {
    dispatch({ type: PICK_ORDER_START, payload: id });
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      let { data } = await Axios.put(`${API_URL}/mod/order/pick/${id}`, null, options);
      console.log(data);
      setTimeout(() => {
        if (data.status) {
          dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
          dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
          dispatch({ type: POST_MOD_CONFIRMED_ORDER, payload: data.confirmedOrders });
        } else {
          toast.error("Order has been picked by other moderator.", { position: "top-right", autoClose: 1000 });
          dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
          dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
          dispatch({ type: POST_MOD_CONFIRMED_ORDER, payload: data.confirmedOrders });
        }
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
};
