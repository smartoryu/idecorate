import { LOGIN_SUCCESS, LOGOUT, MODAL_AUTH, UNVERIFIED, CREATE_NEW_STORE } from "../../support/types";

const INITIAL_STATE = {
  id: 0,
  name: "Decorator",
  username: "",
  role: "",
  suspend: "",
  verified: "",

  login: false,
  logout: false
};

export default (state = INITIAL_STATE, { type, payload, modal }) => {
  switch (type) {
    // ======================================== LOGIN SUCCESS
    case LOGIN_SUCCESS:
      return { ...INITIAL_STATE, ...payload, login: true };
    case UNVERIFIED:
      return { ...INITIAL_STATE, verified: "false" };
    case "LOGIN_PARTNER":
      return { ...INITIAL_STATE, ...payload.user, login: true };

    // ======================================== LOGIN SUCCESS
    case MODAL_AUTH:
      return { ...state, verified: "true" };

    // ======================================== LOGOUT
    case CREATE_NEW_STORE:
      return { ...INITIAL_STATE, ...payload, login: true };

    // ======================================== LOGOUT
    case LOGOUT:
      return { ...INITIAL_STATE, logout: true };

    default:
      return state;
  }
};
