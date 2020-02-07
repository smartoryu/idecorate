/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import "./styles/App.css";
import { API_URL } from "./support/API_URL";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import ModalAuth from "./components/ModalAuth";
import Register from "./pages/Register";
import User from "./pages/User";
import Partner from "./pages/Partner";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("userID");
    const fetchuser = async () => {
      try {
        if (id) {
          const { data } = await Axios.get(`${API_URL}/auth/login/${id}`);
          dispatch({ type: "LOGIN_SUCCESS", payload: data.result });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchuser();
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Menu />
      <ModalAuth />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route path="/partner" component={Partner} />
        {/* <Route path="/login" component={ModalAuth} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
