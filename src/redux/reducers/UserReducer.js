import { LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, UNVERIFIED } from "../../support/types";

const INITIAL_STATE = {
  id: 0,
  name: "Decorator",
  username: "",
  role: "",
  suspend: "",
  verified: "true",

  login: false,
  logout: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // ======================================== LOGIN SUCCESS
    case LOGIN_SUCCESS:
      return { ...INITIAL_STATE, ...payload, login: true };
    case UNVERIFIED:
      return { ...INITIAL_STATE, verified: "false" };

    // ======================================== LOGOUT
    case LOGOUT:
      return { ...INITIAL_STATE, logout: true };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
