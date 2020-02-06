const INITIAL_STATE = {
  btnLogin: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "BTN_LOGIN":
      return { ...state, btnLogin: action.payload };
    default:
      return state;
  }
};
