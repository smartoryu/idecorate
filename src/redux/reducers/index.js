import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import HandleReducers from "./HandleReducers";

export default combineReducers({
  auth: AuthReducers,
  handle: HandleReducers
});
