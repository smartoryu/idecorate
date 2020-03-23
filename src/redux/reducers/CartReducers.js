import { POST_TO_CART, POST_TO_CART_START } from "../../support/types";

const INITIAL_STATE = {
  dataCart: [],
  loading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case POST_TO_CART:
      return { ...INITIAL_STATE, dataCart: payload, loading: false };
    case POST_TO_CART_START:
      return { ...state, loading: true };
    default:
      return state;
  }
};
