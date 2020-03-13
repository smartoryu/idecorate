import { STORE_GET, ON_EDIT_STORE, EDIT_STORE_VALUE, RESET_STORE_VALUE } from "../../support/types";

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

    default:
      return state;
  }
};
