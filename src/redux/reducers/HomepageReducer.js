import { GET_IMAGE_SLIDESHOW, GET_IMAGE_SLIDER, GET_IMAGE_MENUTAB, GET_IMAGE_START } from "../../support/types";

const INITIAL_STATE = {
  imagesSlideshow: [],
  imagesSlider: [],
  imagesMenuTab: [],

  loading: true
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_IMAGE_SLIDESHOW:
      return { ...state, imagesSlideshow: payload, loading: false };
    case GET_IMAGE_SLIDER:
      return { ...state, imagesSlider: payload, loading: false };
    case GET_IMAGE_MENUTAB:
      return { ...state, imagesMenuTab: payload, loading: false };

    case GET_IMAGE_START:
      return { ...state, loading: true };

    default:
      return state;
  }
};
