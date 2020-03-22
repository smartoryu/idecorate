/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { ReLoginAction } from "../../redux/actions/AuthActions";

import { Cart } from "./_Cart";
import { Order } from "./_Order";
import { Review } from "./_Review";
import { Details } from "./_Details";
import { Settings } from "./_Settings";
import { Wishlist } from "./_Wishlist";

export const User = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(ReLoginAction(token));
    }
  }, [dispatch]);

  const { Loading, Role, Logout } = useSelector(({ Auth, User, Store }) => {
    return {
      Loading: Auth.loading,

      Role: User.role,
      Logout: User.logout
    };
  });

  if (Loading) {
    return <Spinner />;
  } else {
    if (Role !== "member" || Logout) {
      return <Redirect to="/" />;
    } else {
      return (
        <section className="d-flex" style={{ minHeight: "calc(100vh - 110.891px)" }}>
          <div className="container no-guters user-wrapper">
            <div className="mt-4 d-block">
              <div className="user-content">
                <div className="row no-gutters">
                  {/* SIDE MENU */}
                  <div className="col-md-2">
                    <div style={{ maxWidth: "100%", height: "100%" }}>{UserSideMenu(match)}</div>
                  </div>

                  {/* CONTENT */}
                  <div className="col-md-10">
                    <div className="ml-5" style={{ maxWidth: "100%", height: "100%" }}>
                      <Route path={`${match.url}/profile`} component={Details} />
                      <Route path={`${match.url}/cart`} component={Cart} />
                      <Route path={`${match.url}/order`} component={Order} />
                      <Route path={`${match.url}/review`} component={Review} />
                      <Route path={`${match.url}/settings`} component={Settings} />
                      <Route path={`${match.url}/wishlist`} component={Wishlist} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
};

const UserSideMenu = match => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Product</div>
        <ul className="list-group list-group-flush">
          <Link to={`${match.url}/wishlist`} className="list-group-item list-group-item-action">
            Wishlist
          </Link>
          <Link to={`${match.url}/cart`} className="list-group-item list-group-item-action">
            My Cart
          </Link>
          <Link to={`${match.url}/order`} className="list-group-item list-group-item-action">
            Order
          </Link>
          <Link to={`${match.url}/review`} className="list-group-item list-group-item-action">
            Review
          </Link>
        </ul>
      </div>

      <div className="card mt-3">
        <div className="card-header">User Profile</div>
        <ul className="list-group list-group-flush">
          <Link to={`${match.url}/profile`} className="list-group-item list-group-item-action">
            Account Details
          </Link>
          <Link to={`${match.url}/settings`} className="list-group-item list-group-item-action">
            Settings
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};
