import {
  VERIFY_START,
  VERIFY_SUCCESS,
  VERIFY_FAILED,
  VERIFY_WRONG,
  CHANGE_USER_VERIFY,
  CHANGE_PASS_VERIFY,
  CHANGE_TYPE_VERIFY
} from "../../support/types";

const INITIAL_STATE = {
  verification: undefined,
  loading: false,
  isRedirect: false,

  username: "",
  password: "",

  showPassowrd: false,
  typePassword: "password",

  errorMessage: ""
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case VERIFY_START:
      return { ...state, errorMessage: "", loading: true };
    case VERIFY_WRONG:
      return { ...INITIAL_STATE, errorMessage: payload, loading: false };
    case VERIFY_FAILED:
      return { ...INITIAL_STATE, loading: true, verification: "failed" };
    case VERIFY_SUCCESS:
      return { ...INITIAL_STATE, loading: true, verification: "success" };

    case CHANGE_USER_VERIFY:
      return { ...state, username: payload };
    case CHANGE_PASS_VERIFY:
      return { ...state, password: payload };
    case CHANGE_TYPE_VERIFY:
      return { ...state, showPassowrd: payload.show, typePassword: payload.type };

    default:
      return state;
  }
};
