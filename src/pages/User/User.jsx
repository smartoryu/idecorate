/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { ReLoginAction } from "../../redux/actions/AuthActions";

import { Cart } from "./Cart/Cart";
import { Order } from "./Order/Order";
import { Review } from "./_Review";
import { Details } from "./_Details";
import { Settings } from "./_Settings";
import { Wishlist } from "./_Wishlist";
import { GetOrderList } from "../../redux/actions";
import { Badge } from "reactstrap";

export const User = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReLoginAction());
    dispatch(GetOrderList());
  }, [dispatch]);

  const { Loading, Role, Logout, DataCart, DataOrders } = useSelector(({ Auth, User, Cart, Order }) => {
    return {
      Loading: Auth.loading,

      Role: User.role,
      Logout: User.logout,

      DataCart: Cart.dataCart,
      DataOrders: Order.dataOrders
    };
  });

  if (Loading) {
    return <Spinner />;
  } else {
    if (Role !== "member" || Logout) {
      return <Redirect to="/" />;
    } else {
      return (
        <section style={{ minHeight: "500px" }} className="d-flex mb-5">
          <div className="container-fluid mx no-guters user-wrapper">
            <div className="mt-4 d-block">
              <div className="user-content">
                <div className="row no-gutters">
                  {/* SIDE MENU */}
                  <div className="col-md-2">
                    <div style={{ maxWidth: "100%", height: "100%" }}>{UserSideMenu({ match, DataCart, DataOrders })}</div>
                  </div>

                  {/* CONTENT */}
                  <div className="col-md-10">
                    <div className="ml-3" style={{ maxWidth: "100%", height: "100%" }}>
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

const UserSideMenu = ({ match, DataCart, DataOrders }) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Product</div>
        <ul className="list-group list-group-flush">
          <Link
            to={`${match.url}/wishlist`}
            className={
              window.location.href === `http://localhost:3000${match.url}/wishlist`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Wishlist
          </Link>
          <Link
            to={`${match.url}/cart`}
            className={
              window.location.href === `http://localhost:3000${match.url}/cart`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            My Cart{" "}
            <Badge pill color="danger">
              {DataCart.length}
            </Badge>
          </Link>
          <Link
            to={`${match.url}/order`}
            className={
              window.location.href === `http://localhost:3000${match.url}/order`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Order{" "}
            <Badge pill color="primary">
              {DataOrders.length}
            </Badge>
          </Link>
          <Link
            to={`${match.url}/review`}
            className={
              window.location.href === `http://localhost:3000${match.url}/review`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Review
          </Link>
        </ul>
      </div>

      <div className="card mt-3">
        <div className="card-header">User Profile</div>
        <ul className="list-group list-group-flush">
          <Link
            to={`${match.url}/profile`}
            className={
              window.location.href === `http://localhost:3000${match.url}/profile`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Account Details
          </Link>
          <Link
            to={`${match.url}/settings`}
            className={
              window.location.href === `http://localhost:3000${match.url}/settings`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Settings
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};
