import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import ModalReducers from "./ModalReducers";

export default combineReducers({
  auth: AuthReducers,
  modal: ModalReducers
});
