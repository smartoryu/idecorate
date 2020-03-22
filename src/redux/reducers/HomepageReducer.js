import { GET_IMAGE_SLIDESHOW, GET_IMAGE_SLIDER } from "../../support/types";

const INITIAL_STATE = {
  imagesSlideshow: [],
  imagesSlider: [],

  loading: true
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_IMAGE_SLIDESHOW:
      return { ...state, imagesSlideshow: payload, loading: false };
    case GET_IMAGE_SLIDER:
      return { ...state, imagesSlider: payload, loading: false };

    default:
      return state;
  }
};
