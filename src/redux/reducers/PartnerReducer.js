import {
  LOGIN_SUCCESS,
  STORE_GET,
  LOGOUT,
  LOGOUT_SUCCESS,
  ON_EDIT_STORE,
  EDIT_STORE_VALUE,
  RESET_STORE_VALUE
} from "../../support/types";

const INITIAL_STATE = {
  id: 0,
  name: "Decorator",
  username: "",
  role: "",
  suspend: "",
  verified: "",

  storeid: 0,
  storename: "",
  storelink: "",
  phone: "",
  email: "",
  photo: "",
  address: "",
  city: "",
  province: "",

  login: false,
  logout: false,

  onEdit: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // ======================================== LOGIN SUCCESS
    case LOGIN_SUCCESS:
      return { ...INITIAL_STATE, ...payload, login: true };

    // ======================================== HANDLE STORE
    case STORE_GET:
      return { ...state, ...payload };
    case ON_EDIT_STORE:
      return { ...state, onEdit: !state.onEdit };
    case EDIT_STORE_VALUE:
      return { ...state, ...payload };
    case RESET_STORE_VALUE:
      return { ...state, onEdit: !state.onEdit };

    // ======================================== LOGOUT
    case LOGOUT:
      return { ...INITIAL_STATE, logout: true };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
