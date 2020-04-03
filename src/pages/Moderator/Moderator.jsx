import React, { Fragment } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";
import { Spinner } from "../../components/Spinner";

import { ManageOrder } from "./ManageOrder/ManageOrder";
import { Complaints } from "./_Complaints";
import { Rewards } from "./_Rewards";
import { Profile } from "./_Profile";
import { ConfirmedOrder } from "./_ConfirmedOrder";

export const Moderator = ({ match }) => {
  const { Loading, Role, Logout, DataOrders, DataConfirmedOrders } = useSelector(({ Auth, User, ModOrder }) => {
    return {
      Loading: Auth.loading,
      Role: User.role,
      Logout: User.logout,

      DataOrders: ModOrder.dataOrders,
      DataConfirmedOrders: ModOrder.dataConfirmedOrders
    };
  });

  if (Loading) {
    return <Spinner />;
  } else {
    if (Role !== "moderator" || Logout) {
      return <Redirect to="/" />;
    } else {
      return (
        <section style={{ minHeight: "500px" }} className="d-flex mb-5">
          <div className="container-fluid no-gutters user-content">
            <div className="mt-4 d-block">
              <div className="user-content">
                <div className="row no-gutters">
                  {/* SIDE MENU */}
                  <div className="col-md-2">
                    <div style={{ maxWidth: "100%", height: "100%" }}>{SideMenu({ match, DataOrders, DataConfirmedOrders })}</div>
                  </div>

                  {/* CONTENT */}
                  <div className="col-md-10">
                    <div className="ml-5" style={{ maxWidth: "100%", height: "100%" }}>
                      <Route path={`${match.url}/order`} component={ManageOrder} />
                      <Route path={`${match.url}/confirmed`} component={ConfirmedOrder} />
                      <Route path={`${match.url}/report`} component={Complaints} />
                      <Route path={`${match.url}/complaints`} component={Complaints} />
                      <Route path={`${match.url}/rewards`} component={Rewards} />
                      <Route path={`${match.url}/profile`} component={Profile} />
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

const SideMenu = ({ match, DataOrders, DataConfirmedOrders }) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Dashboard</div>
        <ul className="list-group list-group-flush">
          <Link
            to={`${match.url}/order`}
            className={
              window.location.href === `http://localhost:3000${match.url}/order`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Manage Order&nbsp;
            <Badge pill color="danger">
              {DataOrders.length}
            </Badge>
          </Link>
          <Link
            to={`${match.url}/confirmed`}
            className={
              window.location.href === `http://localhost:3000${match.url}/confirmed`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Confirmed Order&nbsp;
            <Badge pill color="primary">
              {DataConfirmedOrders.length}
            </Badge>
          </Link>
          <Link
            to={`${match.url}/report`}
            className={
              window.location.href === `http://localhost:3000${match.url}/report`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Report
          </Link>
          <Link
            to={`${match.url}/complaints`}
            className={
              window.location.href === `http://localhost:3000${match.url}/complaints`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Complaints
          </Link>
          <Link
            to={`${match.url}/rewards`}
            className={
              window.location.href === `http://localhost:3000${match.url}/rewards`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Rewards
          </Link>
          <Link
            to={`${match.url}/profile`}
            className={
              window.location.href === `http://localhost:3000${match.url}/profile`
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }>
            Profile
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};
