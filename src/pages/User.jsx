/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Route } from "react-router-dom";

import { Cart } from "../components/User/_Cart";
import { Chat } from "../components/User/_Chat";
import { Review } from "../components/User/_Review";
import { Details } from "../components/User/_Details";
import { Settings } from "../components/User/_Settings";
import { Wishlist } from "../components/User/_Wishlist";

function User({ match }) {
  const UserSideMenu = () => {
    return (
      <section>
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
            <Link to={`${match.url}`} className="list-group-item list-group-item-action">
              Account Details
            </Link>
            <Link to={`${match.url}/settings`} className="list-group-item list-group-item-action">
              Settings
            </Link>
          </ul>
        </div>
      </section>
    );
  };

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
                  <Route exact path={`${match.path}/`} component={Details} />
                  <Route path={`${match.path}/cart`} component={Cart} />
                  <Route path={`${match.path}/chat`} component={Chat} />
                  <Route path={`${match.path}/review`} component={Review} />
                  <Route path={`${match.path}/settings`} component={Settings} />
                  <Route path={`${match.path}/wishlist`} component={Wishlist} />
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
