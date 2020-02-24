import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  user: UserReducer
});
