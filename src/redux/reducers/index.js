import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import ProductReducers from "./ProductReducers";

export default combineReducers({
  auth: AuthReducers,
  product: ProductReducers
});
