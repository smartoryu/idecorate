/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Router } from "@reach/router";
import "./styles/App.css";

import Menu from "./components/Menu";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <Menu />
      <Router>
        <Homepage path="/" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
