const INITIAL_STATE = {
  id: 0,
  name: "Decorator",
  username: "",
  email: "",
  role: "",
  suspend: "",
  verified: "",

  register: false,
  login: false,
  logout: false,
  modalAuth: false,

  goodUser: false,

  errorUserLog: false,
  errorPassLog: false,
  textUserLog: "",
  textPassLog: "",

  errorName: false,
  errorUser: false,
  errorPass: false,
  errorEmail: false,
  errorServer: false,

  textName: "",
  textUser: "",
  textPass: "",
  textEmail: "",
  textServer: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ======================================== SUCCESS
    case "LOGIN_SUCCESS":
      return { ...INITIAL_STATE, ...action.payload, login: true };
    case "REG_SUCCESS":
      return { ...INITIAL_STATE, register: true };
    case "GOOD_USER":
      return { ...INITIAL_STATE, modalAuth: true, goodUser: true };

    // ======================================== LOGOUT
    case "LOGOUT":
      return { ...INITIAL_STATE, logout: true };
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;

    // ======================================== MODAL AUTH
    case "MODAL_AUTH":
      return { ...state, modalAuth: action.payload };

    // ======================================== ERROR
    case "SERVER_ERROR":
      return {
        ...INITIAL_STATE,
        errorServer: true,
        errorPassLog: false,
        textServer: action.payload
      };
    case "WRONG_USERLOG":
      return {
        ...INITIAL_STATE,
        errorUserLog: true,
        modalAuth: true,
        textUserLog: action.payload
      };
    case "WRONG_PASSLOG":
      return {
        ...INITIAL_STATE,
        errorPassLog: true,
        modalAuth: true,
        textPassLog: action.payload
      };
    case "WRONG_SECRET":
      return {
        ...state,
        errorSecret: true,
        textSecret: action.payload
      };
    case "WRONG_USER":
      return {
        ...INITIAL_STATE,
        errorUser: true,
        modalAuth: true,
        textUser: action.payload
      };
    case "WRONG_PASS":
      return {
        ...INITIAL_STATE,
        goodUser: true,
        errorPass: true,
        modalAuth: true,
        textPass: action.payload
      };
    case "WRONG_FORM":
      return {
        ...INITIAL_STATE,
        errorName: true,
        errorUser: true,
        errorPass: true,
        errorEmail: true,
        modalAuth: true,
        textName: action.payload,
        textUser: action.payload,
        textPass: action.payload,
        textEmail: action.payload
      };
    default:
      return state;
  }
};
