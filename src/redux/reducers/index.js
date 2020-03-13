import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import UserReducer from "./UserReducer";
import StoreReducer from "./StoreReducer";

export default combineReducers({
  Auth: AuthReducer,
  Product: ProductReducer,
  User: UserReducer,
  Store: StoreReducer
});
