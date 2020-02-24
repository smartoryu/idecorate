import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReduce";

export default combineReducers({
  auth: AuthReducer,
  product: ProductReducer
});
