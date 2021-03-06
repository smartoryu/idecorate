import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import {
  CREATE_NEW_STORE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  WRONG_PASSLOG,
  WRONG_PASS,
  WRONG_USER,
  WRONG_USERLOG,
  WRONG_FORM,
  SUSPENDED,
  GOOD_USER,
  MODAL_AUTH,
  SERVER_ERROR,
  REG_SUCCESS,
  UNVERIFIED,
  POST_TO_CART,
  POST_MOD_ORDERS,
  POST_MOD_ORDER_ITEMS,
  POST_MOD_CONFIRMED_ORDER
} from "../../support/types";
import Swal from "sweetalert2";

export const LoginAction = (username, password) => {
  return async dispatch => {
    try {
      let { data } = await Axios.get(`${API_URL}/auth/login`, { params: { username, password } });

      switch (data.status) {
        case UNVERIFIED:
          return dispatch({ type: UNVERIFIED });
        case SUSPENDED:
          return dispatch({ type: SUSPENDED, payload: data.message });
        case WRONG_FORM:
          return dispatch({ type: WRONG_FORM, payload: data.message });
        case WRONG_USER:
          return dispatch({ type: WRONG_USERLOG, payload: data.message });
        case WRONG_PASS:
          return dispatch({ type: WRONG_PASSLOG, payload: data.message });
        case LOGOUT_SUCCESS:
          return dispatch({ type: LOGOUT_SUCCESS });

        case LOGIN_SUCCESS:
          localStorage.setItem("token", data.token);
          dispatch({ type: MODAL_AUTH, payload: false });

          // GET CART
          dispatch({ type: POST_TO_CART, payload: data.cart });
          return dispatch({ type: LOGIN_SUCCESS, payload: data.result });

        case "LOGIN_NEW_PARTNER":
          dispatch({ type: LOGIN_SUCCESS });
          localStorage.setItem("token", data.token);
          return dispatch({ type: CREATE_NEW_STORE, modal: true, payload: data.result });

        case "LOGIN_MODERATOR":
          localStorage.setItem("token", data.token);

          dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
          dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
          dispatch({ type: POST_MOD_CONFIRMED_ORDER, payload: data.confirmedOrders });

          return dispatch({ type: LOGIN_SUCCESS, modal: true, payload: data.result });

        case "LOGIN_PARTNER":
          localStorage.setItem("token", data.token);
          dispatch({ type: MODAL_AUTH, payload: false });
          // GET PRODUCT
          let options = { headers: { Authorization: `Bearer ${data.token}` } };
          const prod = await Axios.get(`${API_URL}/product/get_products`, options);
          dispatch({ type: "GET_PRODUCT", payload: prod.data.result });
          return dispatch({
            type: "LOGIN_PARTNER",
            payload: { user: data.result, store: data.store }
          });

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: SERVER_ERROR, payload: "Server error!" });
    }
  };
};

export const ReLoginAction = () => {
  return async dispatch => {
    let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
    try {
      const { data } = await Axios.get(`${API_URL}/auth/keeplogin`, options);
      switch (data.status) {
        case LOGIN_SUCCESS:
          localStorage.setItem("token", data.token);

          // GET CART
          dispatch({ type: POST_TO_CART, payload: data.cart });
          return dispatch({ type: LOGIN_SUCCESS, payload: data.result });

        case CREATE_NEW_STORE:
          localStorage.setItem("token", data.token);
          dispatch({ type: LOGIN_SUCCESS });
          return dispatch({ type: CREATE_NEW_STORE, modal: true, payload: data.result });

        case "LOGIN_PARTNER":
          localStorage.setItem("token", data.token);

          let options = { headers: { Authorization: `Bearer ${data.token}` } };
          const products = await Axios.get(`${API_URL}/product/get_products`, options);
          const types = await Axios.get(`${API_URL}/product/get_types`, options);
          dispatch({ type: "GET_TYPES", payload: types.data.result });
          dispatch({ type: "GET_PRODUCT", payload: products.data.result });

          return dispatch({
            type: "LOGIN_PARTNER",
            payload: { user: data.result, store: data.store }
          });

        case "LOGIN_MODERATOR":
          localStorage.setItem("token", data.token);

          dispatch({ type: POST_MOD_ORDERS, payload: data.orders });
          dispatch({ type: POST_MOD_ORDER_ITEMS, payload: data.orderItems });
          dispatch({ type: POST_MOD_CONFIRMED_ORDER, payload: data.confirmedOrders });

          return dispatch({ type: LOGIN_SUCCESS, modal: true, payload: data.result });

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: SERVER_ERROR, payload: "Server error!" });
    }
  };
};

export const CheckUsername = username => {
  return async dispatch => {
    try {
      let { data } = await Axios.get(`${API_URL}/auth/check_username`, { params: { username } });
      console.log(data.message);
      switch (data.status) {
        case GOOD_USER:
          return dispatch({ type: GOOD_USER });
        case WRONG_USER:
          return dispatch({ type: WRONG_USER, payload: data.message });
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: SERVER_ERROR, payload: "Server error!" });
    }
  };
};

export const RegisterAction = ({ name, username, email, password, password2 }) => {
  return async dispatch => {
    try {
      let newUser = await Axios.post(`${API_URL}/auth/register`, {
        name,
        username,
        email,
        password,
        password2
      });

      switch (newUser.data.status) {
        case WRONG_FORM:
          return dispatch({ type: WRONG_FORM, payload: newUser.data.message });
        case WRONG_USER:
          return dispatch({ type: WRONG_USER, payload: newUser.data.message });
        case GOOD_USER:
          return dispatch({ type: GOOD_USER, payload: newUser.data.message });
        case WRONG_PASS:
          return dispatch({ type: WRONG_PASS, payload: newUser.data.message });
        case REG_SUCCESS:
          Swal.fire({
            title: "Registration Success!",
            text: "Check your email for confirmation link.",
            position: "center",
            confirmButtonColor: "#3085d6"
          });
          dispatch({ type: MODAL_AUTH, payload: false });
          return dispatch({ type: REG_SUCCESS });
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: SERVER_ERROR, payload: "Server error!" });
    }
  };
};
