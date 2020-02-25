import { ADD_PRODUCT_SUCCESS, EMPTY_PRODUCT_NAME, EMPTY_PRODUCT_PRICE, RESET_PRODUCT } from "../../support/types";

const INITIAL_STATE = {
  redirect: false,

  errorName: "",
  errorPrice: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return { ...INITIAL_STATE, redirect: true };
    case EMPTY_PRODUCT_NAME:
      return { ...INITIAL_STATE, errorName: action.payload };
    case EMPTY_PRODUCT_PRICE:
      return { ...INITIAL_STATE, errorPrice: action.payload };
    case RESET_PRODUCT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
