import {
  ADD_PRODUCT_SUCCESS,
  EMPTY_PRODUCT_NAME,
  EMPTY_PRODUCT_PRICE,
  RESET_PRODUCT,
  MODAL_PRODUCT,
  INSERT_PRODUCT,
  GET_PRODUCT
} from "../../support/types";

const INITIAL_STATE = {
  dataProduct: [],

  productid: 0,
  name: "",
  price: 0,
  stock: 0,
  type: "",
  about: "",

  imageid: 0,
  image: "",

  modal: false,
  redirect: false,

  onEdit: false,
  onDelete: false,

  errorName: "",
  errorPrice: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...INITIAL_STATE, ...action.payload };

    case ADD_PRODUCT_SUCCESS:
      return { ...INITIAL_STATE, ...action.payload, redirect: true };

    case INSERT_PRODUCT:
      return { ...state, ...action.payload };

    case EMPTY_PRODUCT_NAME:
      return { ...INITIAL_STATE, errorName: action.payload };
    case EMPTY_PRODUCT_PRICE:
      return { ...INITIAL_STATE, errorPrice: action.payload };

    case MODAL_PRODUCT:
      return { ...state, productid: action.payload, modal: !state.modal };
    case RESET_PRODUCT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
