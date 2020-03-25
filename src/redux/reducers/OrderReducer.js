import { POST_TO_ORDERS, POST_TO_ORDERS_START, GET_ORDERS, POST_TO_ORDER_ITEMS } from "../../support/types";

const INITIAL_STATE = {
  dataOrders: [],
  dataOrderItems: [],
  loading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_ORDERS:
      return { ...INITIAL_STATE, dataOrders: payload };

    case POST_TO_ORDERS_START:
      return { ...state, loading: true };
    case POST_TO_ORDERS:
      return { ...INITIAL_STATE, dataOrders: payload };
    case POST_TO_ORDER_ITEMS:
      return { ...state, dataOrderItems: payload };

    default:
      return state;
  }
};
