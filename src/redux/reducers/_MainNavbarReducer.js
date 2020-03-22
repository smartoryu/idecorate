import { GET_P_TYPE, GET_P_DETAILS, GET_P_START, GET_P_IMAGES } from "../../support/types";

const INITIAL_STATE = {
  loading: true,

  types: [],
  productDetails: {},
  productImages: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_P_START:
      return { ...state, loading: true };

    case GET_P_TYPE:
      return { ...state, types: payload, loading: false };
    case GET_P_DETAILS:
      return { ...state, productDetails: payload, loading: false };
    case GET_P_IMAGES:
      return { ...state, productImages: payload, loading: false };

    default:
      return state;
  }
};
