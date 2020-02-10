import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import HandleReducers from "./HandleReducers";
import FileReducers from "./FileReducers";
import ProductReducers from "./ProductReducers";

export default combineReducers({
  auth: AuthReducers,
  handle: HandleReducers,
  file: FileReducers,
  product: ProductReducers
});
