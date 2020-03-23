import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { GET_P_TYPE, GET_P_START } from "../../support/types";

export const GetProductTypes = () => {
  return async dispatch => {
    dispatch({ type: GET_P_START });
    try {
      const { data } = await Axios.get(`${API_URL}/homepage/p/get_types`);
      dispatch({ type: GET_P_TYPE, payload: data.result });
    } catch (err) {
      console.log(err);
    }
  };
};
