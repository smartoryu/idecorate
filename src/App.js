/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import ModalAuth from "./components/ModalAuth";
import User from "./pages/User";
import Partner from "./pages/Partner";
import { ReLoginAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  toast.configure();

  useEffect(() => {
    dispatch(ReLoginAction(localStorage.getItem("userID")));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Menu />
      <ModalAuth />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/user" component={User} />
        <Route path="/partner" component={Partner} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
