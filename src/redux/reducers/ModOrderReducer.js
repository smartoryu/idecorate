import { POST_MOD_ORDERS, POST_MOD_ORDER_ITEMS, PUT_PAYMENT_START, POST_MOD_CONFIRMED_ORDER } from "../../support/types";

const INITIAL_STATE = {
  dataOrders: [],
  dataOrderItems: [],
  dataConfirmedOrders: [],
  loading: false,
  selected: -1
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PUT_PAYMENT_START:
      return { ...state, loading: true, selected: payload };

    case POST_MOD_ORDERS:
      return { ...INITIAL_STATE, dataOrders: payload };
    case POST_MOD_ORDER_ITEMS:
      return { ...state, dataOrderItems: payload };
    case POST_MOD_CONFIRMED_ORDER:
      return { ...state, dataConfirmedOrders: payload };

    default:
      return state;
  }
};
