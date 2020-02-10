const INITIAL_STATE = {
  image: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_IMAGE":
      return state.image.push(action.payload);
    case "DELETE_IMAGE":
      return state.image.splice(action.payload, 1);
    case "RESET_IMAGE":
      return INITIAL_STATE;
    default:
      return state;
  }
};
