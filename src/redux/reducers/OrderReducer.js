import { POST_TO_ORDERS, POST_TO_ORDERS_START } from "../../support/types";

const INITIAL_STATE = {
  dataOrders: [],
  loading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case POST_TO_ORDERS:
      return { ...INITIAL_STATE, dataOrders: payload };
    case POST_TO_ORDERS_START:
      return { ...state, loading: true };

    default:
      return state;
  }
};
