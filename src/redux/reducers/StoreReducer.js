import { STORE_GET, ON_EDIT_STORE, EDIT_STORE_VALUE, RESET_STORE_VALUE, CREATE_NEW_STORE, LOGOUT } from "../../support/types";

const INITIAL_STATE = {
  storeid: 0,
  storename: "",
  storelink: "",
  phone: "",
  email: "",
  photo: "",
  address: "",
  city: "",
  province: "",

  loading: false,
  create: false,

  modalStore: false,

  onEdit: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // ======================================== HANDLE STORE
    case STORE_GET:
      return { ...state, ...payload };
    case ON_EDIT_STORE:
      return { ...state, onEdit: !state.onEdit };
    case EDIT_STORE_VALUE:
      return { ...state, ...payload };
    case RESET_STORE_VALUE:
      return { ...state, onEdit: !state.onEdit };

    case CREATE_NEW_STORE:
      return { ...INITIAL_STATE, modalStore: true };
    case "CREATE_STORE_START":
      return { ...state, loading: true };
    case "CREATE_STORE_FAILED":
      return { ...state, loading: false };
    case "CREATE_STORE_SUCCESS":
      return { ...INITIAL_STATE, ...payload, loading: false, create: true };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
