const INITIAL_STATE = {
  modalAuth: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MODAL_AUTH":
      return { ...state, modalAuth: action.payload };
    default:
      return state;
  }
};
