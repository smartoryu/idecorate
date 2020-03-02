/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

import { ReLoginAction } from "./redux/actions";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ModalAuth from "./components/ModalAuth";

import Homepage from "./pages/Homepage/Homepage";
import User from "./pages/User/User";
import Partner from "./pages/Partner/Partner";

function App() {
  const dispatch = useDispatch();

  toast.configure();

  useEffect(() => {
    dispatch(ReLoginAction(localStorage.getItem("token")));
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
