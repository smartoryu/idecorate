import {
  ADD_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  EMPTY_PRODUCT_NAME,
  EMPTY_PRODUCT_PRICE,
  RESET_PRODUCT,
  MODAL_IMAGES,
  MODAL_EDIT,
  INSERT_PRODUCT,
  GET_PRODUCT,
  GET_TYPES,
  GET_IMAGES
} from "../../support/types";

const INITIAL_STATE = {
  dataProduct: [],
  productTypes: [],
  productImages: [],

  productid: 0,
  productname: "",
  price: 0,
  stock: 0,
  type: "",
  about: "",

  modalImages: false,
  redirect: false,

  onEdit: false,
  onDelete: false,

  errorName: "",
  errorPrice: 0
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT:
      return { ...INITIAL_STATE, dataProduct: payload };
    case GET_TYPES:
      return { ...state, productTypes: payload };
    case GET_IMAGES:
      return { ...state, productImages: payload };

    case ADD_PRODUCT_SUCCESS:
      return { ...INITIAL_STATE, ...payload, redirect: true };
    case EDIT_PRODUCT_SUCCESS:
      return { ...INITIAL_STATE, dataProduct: payload, onEdit: true };

    case INSERT_PRODUCT:
      return { ...state, ...payload };

    case EMPTY_PRODUCT_NAME:
      return { ...INITIAL_STATE, errorName: payload };
    case EMPTY_PRODUCT_PRICE:
      return { ...INITIAL_STATE, errorPrice: payload };

    case MODAL_IMAGES:
      return { ...state, ...payload, modalImages: !state.modalImages };
    case MODAL_EDIT:
      return { ...state, ...payload, onEdit: !state.onEdit };
    case RESET_PRODUCT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
