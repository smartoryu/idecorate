const INITIAL_STATE = {
  login: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MODAL_LOGIN":
      return { ...state, login: action.payload };
    default:
      return state;
  }
};
