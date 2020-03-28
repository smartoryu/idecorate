import {
  POST_MOD_ORDERS,
  POST_MOD_ORDER_ITEMS,
  PUT_PAYMENT_START,
  POST_MOD_CONFIRMED_ORDER,
  PICK_ORDER_START,
  PICK_ORDER_FAILED
} from "../../support/types";

const INITIAL_STATE = {
  dataOrders: [],
  dataOrderItems: [],
  dataConfirmedOrders: [],
  loading: false,
  selected: -1,
  error: ""
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

    case PICK_ORDER_START:
      return { ...state, loading: true, selected: payload };
    case PICK_ORDER_FAILED:
      return { ...state, loading: false, selected: -1, error: payload };

    default:
      return state;
  }
};
