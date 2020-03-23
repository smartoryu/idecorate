import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import UserReducer from "./UserReducer";
import StoreReducer from "./StoreReducer";
import AccountVerificationReducer from "./AccountVerificationReducer";
import HomepageReducer from "./HomepageReducer";
import _MainNavbarReducer from "./_MainNavbarReducer";
import CartReducers from "./CartReducers";

export default combineReducers({
  Auth: AuthReducer,
  Product: ProductReducer,
  User: UserReducer,
  Store: StoreReducer,
  AccountVerification: AccountVerificationReducer,
  Homepage: HomepageReducer,
  MainNavbar: _MainNavbarReducer,
  Cart: CartReducers
});
