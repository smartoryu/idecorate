import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import PartnerReducer from "./PartnerReducer";

export default combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  partner: PartnerReducer
});
