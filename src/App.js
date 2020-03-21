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
import VerifyAccount from "./pages/AccountVerification";
import { ManageAdmin } from "./pages/Admin/ManageAdmin";
import { User } from "./pages/User/User";
import Partner from "./pages/Partner/Partner";
import { CreateStore } from "./pages/Partner/_CreateStore";

function App() {
  const dispatch = useDispatch();

  toast.configure();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(ReLoginAction(token));
    }
  }, [dispatch]);

  return (
    <>
      <Menu />
      <ModalAuth />
      <div className="wrapper">
        <div className="content">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/verification/:idverify" component={VerifyAccount} />
            <Route path="/admin" component={ManageAdmin} />
            <Route path="/m/:userid/:username" component={User} />
            <Route path="/p/:userid/:username" component={Partner} />
            <Route path="/new_store" component={CreateStore} />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
