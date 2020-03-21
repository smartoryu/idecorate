import Axios from "axios";
import { LOGIN_SUCCESS, VERIFY_START, VERIFY_SUCCESS, VERIFY_FAILED, VERIFY_WRONG } from "../../support/types";
import { API_URL } from "../../support/API_URL";

export const HandleVerifyAccount = ({ Username, Password, Params }) => {
  return async dispatch => {
    if (Username && Password) {
      dispatch({ type: VERIFY_START });
      try {
        let { data } = await Axios.post(`${API_URL}/auth/verify?token=${Params}`, { Username, Password });
        console.log(data);
        switch (data.status) {
          case VERIFY_WRONG:
            return setTimeout(() => {
              dispatch({ type: VERIFY_WRONG, payload: data.message });
            }, 3000);

          case VERIFY_FAILED:
            return setTimeout(() => {
              dispatch({ type: VERIFY_FAILED });
            }, 3000);

          case LOGIN_SUCCESS:
            return setTimeout(() => {
              localStorage.setItem("token", data.token);
              dispatch({ type: LOGIN_SUCCESS, payload: data.result });
              dispatch({ type: VERIFY_SUCCESS });
            }, 3000);

          default:
            break;
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: VERIFY_FAILED });
      }
    } else {
      dispatch({ type: VERIFY_FAILED, payload: "Username/Password can't be empty!" });
    }
  };
};
