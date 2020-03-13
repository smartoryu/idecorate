import {
  LOGIN_SUCCESS,
  REG_SUCCESS,
  GOOD_USER,
  MODAL_AUTH,
  SERVER_ERROR,
  WRONG_USERLOG,
  WRONG_PASSLOG,
  WRONG_SECRET,
  WRONG_USER,
  WRONG_PASS,
  WRONG_FORM,
  UNVERIFIED,
  LOGOUT,
  LOGIN_FAILED
} from "../../support/types";

const INITIAL_STATE = {
  loading: true,
  modalAuth: false,
  register: false,

  goodUser: false,

  errorUserLog: "",
  errorPassLog: "",

  errorName: "",
  errorUser: "",
  errorPass: "",
  errorEmail: "",
  errorServer: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ======================================== REG SUCCESS
    case REG_SUCCESS:
      return { ...INITIAL_STATE, register: true };
    case GOOD_USER:
      return { ...INITIAL_STATE, modalAuth: true, goodUser: true };

    // ======================================== LOGIN
    case LOGIN_SUCCESS:
      return { ...INITIAL_STATE, loading: false };
    case UNVERIFIED:
      return { ...INITIAL_STATE, modalAuth: true };
    case LOGIN_FAILED:
      return { ...INITIAL_STATE, loading: false };

    // ======================================== MODAL AUTH
    case MODAL_AUTH:
      return { ...state, modalAuth: action.payload };

    // ======================================== LOGOUT
    case LOGOUT:
      return INITIAL_STATE;

    // ======================================== ERROR
    case SERVER_ERROR:
      return {
        ...INITIAL_STATE,
        errorServer: action.payload,
        errorPassLog: false
      };
    case WRONG_USERLOG:
      return {
        ...INITIAL_STATE,
        errorUserLog: action.payload,
        modalAuth: true
      };
    case WRONG_PASSLOG:
      return {
        ...INITIAL_STATE,
        errorPassLog: action.payload,
        modalAuth: true
      };
    case WRONG_SECRET:
      return {
        ...state,
        errorSecret: true,
        textSecret: action.payload
      };
    case WRONG_USER:
      return {
        ...INITIAL_STATE,
        errorUser: action.payload,
        modalAuth: true
      };
    case WRONG_PASS:
      return {
        ...INITIAL_STATE,
        goodUser: true,
        errorPass: action.payload,
        modalAuth: true
      };
    case WRONG_FORM:
      return {
        ...INITIAL_STATE,
        errorName: action.payload,
        errorUser: true,
        errorPass: true,
        errorEmail: action.payload,
        modalAuth: true
      };
    default:
      return state;
  }
};
