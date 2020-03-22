import Axios from "axios";
import { API_URL } from "../../support/API_URL";
import { GET_IMAGE_SLIDER, GET_IMAGE_SLIDESHOW } from "../../support/types";

export const GetImageSlider = () => {
  return async dispatch => {
    try {
      const { data } = await Axios.get(`${API_URL}/homepage/slider`);
      dispatch({ type: GET_IMAGE_SLIDER, payload: data.result });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetImageSlideshow = () => {
  return async dispatch => {
    try {
      const { data } = await Axios.get(`${API_URL}/homepage/slideshow`);
      dispatch({ type: GET_IMAGE_SLIDESHOW, payload: data.result });
    } catch (error) {
      console.log(error);
    }
  };
};
