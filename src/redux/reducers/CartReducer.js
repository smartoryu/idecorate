import {
  POST_TO_CART,
  POST_TO_CART_START,
  UPDATE_QTY_SUCCESS,
  UPDATE_QTY_START,
  GET_ADDRESS_CART,
  SELECT_ADDRESS_CART,
  DELETE_CART_START
} from "../../support/types";

const INITIAL_STATE = {
  dataCart: [],
  loading: false,
  editItem: false,
  deleteItem: false,

  dataAddress: [],
  address: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case POST_TO_CART:
      return { ...INITIAL_STATE, dataCart: payload };
    case POST_TO_CART_START:
      return { ...state, loading: true };

    case UPDATE_QTY_SUCCESS:
      return { ...INITIAL_STATE, dataCart: payload };
    case UPDATE_QTY_START:
      return { ...state, editItem: true };

    case DELETE_CART_START:
      return { ...state, deleteItem: true };

    case GET_ADDRESS_CART:
      return { ...state, dataAddress: payload };
    case SELECT_ADDRESS_CART:
      return { ...state, address: payload };

    default:
      return state;
  }
};
