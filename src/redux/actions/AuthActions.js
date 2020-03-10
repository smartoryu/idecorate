import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import {
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
  REG_SUCCESS
} from "../../support/types";

export const LoginAction = (username, password) => {
  return async dispatch => {
    try {
      let user = await Axios.get(`${API_URL}/auth/login`, { params: { username, password } });

      switch (user.data.status) {
        case SUSPENDED:
          return dispatch({ type: SUSPENDED, payload: user.data.message });
        case WRONG_FORM:
          return dispatch({ type: WRONG_FORM, payload: user.data.message });
        case WRONG_USER:
          return dispatch({ type: WRONG_USERLOG, payload: user.data.message });
        case WRONG_PASS:
          return dispatch({ type: WRONG_PASSLOG, payload: user.data.message });
        case LOGOUT_SUCCESS:
          return dispatch({ type: LOGOUT_SUCCESS });
        case LOGIN_SUCCESS:
          // localStorage.setItem("userID", user.data.result.id);
          localStorage.setItem("token", user.data.token);
          dispatch({ type: MODAL_AUTH, payload: false });
          return dispatch({ type: LOGIN_SUCCESS, payload: user.data.result });
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: SERVER_ERROR, payload: "Server error!" });
    }
  };
};

export const ReLoginAction = token => {
  return async dispatch => {
    try {
      if (token) {
        let options = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await Axios.get(`${API_URL}/auth/keeplogin`, options);
        dispatch({ type: LOGIN_SUCCESS, payload: data.result });
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
