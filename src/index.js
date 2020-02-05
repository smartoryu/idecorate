import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "./redux/reducers";

import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from "./App";

ReactDOM.render(
  <Provider store={createStore(Reducer, {}, applyMiddleware(thunk))}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
