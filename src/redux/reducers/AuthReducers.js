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

  errorName: false,
  errorUser: false,
  errorPass: false,
  errorEmail: false,
  errorServer: true,

  wrongName: "",
  wrongUser: "",
  wrongPass: "",
  wrongEmail: "",
  wrongServer: ""
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
        wrongServer: action.payload
      };
    case "SUSPENDED":
      return {
        ...INITIAL_STATE,
        errorUser: true,
        wrongUser: action.payload
      };
    case "WRONG_USER":
      return {
        ...INITIAL_STATE,
        errorUser: true,
        wrongUser: action.payload
      };
    case "WRONG_PASS":
      return {
        ...INITIAL_STATE,
        errorPass: true,
        wrongPass: action.payload
      };
    case "WRONG_FORM":
      return {
        ...INITIAL_STATE,
        errorName: true,
        errorUser: true,
        errorPass: true,
        errorEmail: true,
        wrongName: action.payload,
        wrongUser: action.payload,
        wrongPass: action.payload,
        wrongEmail: action.payload
      };
    default:
      return state;
  }
};
