const INITIAL_STATE = {
  id: 0,
  name: "Decorator",
  username: "",
  email: "",
  role: "",
  suspend: "",
  verified: "",

  login: false,
  logout: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ======================================== LOGIN SUCCESS
    case "LOGIN_SUCCESS":
      return { ...INITIAL_STATE, ...action.payload, login: true };

    // ======================================== LOGOUT
    case "LOGOUT":
      return { ...INITIAL_STATE, logout: true };
    case "LOGOUT_SUCCESS":
      return INITIAL_STATE;

    default:
      return state;
  }
};
