const INITIAL_STATE = {
  id: 0,
  name: "",
  username: "",
  email: "",
  role: "",
  suspend: "",
  verified: "",

  register: false,
  login: false,
  logout: false,

  goodUser: false,
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
    // ===== SUCCESS
    case "LOGIN_SUCCESS":
      return { ...INITIAL_STATE, ...action.payload, login: true };
    case "REG_SUCCESS":
      return { ...INITIAL_STATE, register: true };

    // ===== LOGOUT
    case "LOGOUT":
      return { ...INITIAL_STATE, login: false, logout: true };
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;

    // ===== ERROR
    case "SERVER_ERROR":
      return {
        ...INITIAL_STATE,
        errorServer: true,
        textServer: action.payload
      };
    case "SUSPENDED":
      return {
        ...INITIAL_STATE,
        errorUser: true,
        textUser: action.payload
      };
    case "GOOD_USER":
      return {
        ...INITIAL_STATE,
        goodUser: true
      };
    case "WRONG_USER":
      return {
        ...INITIAL_STATE,
        errorUser: true,
        textUser: action.payload
      };
    case "WRONG_PASS":
      return {
        ...INITIAL_STATE,
        goodUser: true,
        errorPass: true,
        textPass: action.payload
      };
    case "WRONG_FORM":
      return {
        ...INITIAL_STATE,
        errorName: true,
        errorUser: true,
        errorPass: true,
        errorEmail: true,
        textName: action.payload,
        textUser: action.payload,
        textPass: action.payload,
        textEmail: action.payload
      };
    default:
      return state;
  }
};
