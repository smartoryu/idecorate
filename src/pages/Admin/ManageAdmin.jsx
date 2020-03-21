import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "../../components/Spinner";

export const ManageAdmin = () => {
  const { Loading, Role, Logout } = useSelector(({ Auth, User }) => {
    return {
      Loading: Auth.loading,
      Role: User.role,
      Logout: User.logout
    };
  });

  if (Loading) {
    if (Logout) {
      return <Redirect to="/" />;
    } else {
      return <Spinner />;
    }
  }
  if (Role !== "admin") {
    return <Redirect to="/" />;
  }
  return (
    <div className="container no-gutters user-content">
      <div className="user-content mt-4 d-block row no-gutters">
        {/* SIDE MENU */}
        <div className="col-md-2">
          <div style={{ maxWidth: "100%", height: "100%" }}>{SideMenu()}</div>
        </div>

        {/* CONTENT */}
        <div className="col-md-2">
          <div className="ml-5" style={{ maxWidth: "100%", height: "100%" }}>
            tes
          </div>
        </div>
      </div>
    </div>
  );
};

const SideMenu = () => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Dashboard</div>
        <ul className="list-group list-group-flush">
          <Link to="#" className="list-group-item list-group-item-action">
            Manage Member
          </Link>
          <Link to="#" className="list-group-item list-group-item-action">
            Manage Partner
          </Link>
          <Link to="#" className="list-group-item list-group-item-action disabled">
            tes 3
          </Link>
          <Link to="#" className="list-group-item list-group-item-action disabled">
            tes 4
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};
