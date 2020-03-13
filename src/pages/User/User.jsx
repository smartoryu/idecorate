/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

import { Cart } from "./_Cart";
import { Chat } from "./_Chat";
import { Review } from "./_Review";
import { Details } from "./_Details";
import { Settings } from "./_Settings";
import { Wishlist } from "./_Wishlist";

function User({ match }) {
  const Loading = useSelector(({ Auth }) => Auth.loading);
  const Role = useSelector(({ User }) => User.role);

  const UserSideMenu = () => {
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
            <Link to={`${match.url}/chat`} className="list-group-item list-group-item-action">
              Chat
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

  if (Loading) {
    return <Spinner />;
  } else if (Role !== "member") {
    return <Redirect to="/" />;
  }

  return (
    <section className="d-flex" style={{ minHeight: "calc(100vh - 110.891px)" }}>
      <div className="container no-guters user-wrapper">
        <div className="mt-4 d-block">
          <div className="user-content">
            <div className="row no-gutters">
              {/* SIDE MENU */}
              <div className="col-md-2">
                <div style={{ maxWidth: "100%", height: "100%" }}>{UserSideMenu()}</div>
              </div>
              {/* CONTENT */}
              <div className="col-md-10">
                <div className="ml-5" style={{ maxWidth: "100%", height: "100%" }}>
                  <Route path={`${match.url}/profile`} component={Details} />
                  <Route path={`${match.url}/cart`} component={Cart} />
                  <Route path={`${match.url}/chat`} component={Chat} />
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

export default User;
