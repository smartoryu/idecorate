import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import Axios from "axios";

import { Details } from "./_Details";
import { Product } from "./_Product";
import { AddProduct } from "./_ProductAdd";
import { Store } from "./_Store";
import { Review } from "./_Review";

import { Spinner } from "../../components/Spinner";
import { API_URL } from "../../support/API_URL";
import { STORE_GET, LOGIN_FAILED } from "../../support/types";

function Partner({ match }) {
  const dispatch = useDispatch();
  const Loading = useSelector(({ Auth }) => Auth.loading);
  const Role = useSelector(({ User }) => User.role);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        let options = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
        let { data } = await Axios.get(`${API_URL}/partner`, options);
        dispatch({ type: STORE_GET, payload: data.result });
      } catch (err) {
        dispatch({ type: LOGIN_FAILED });
      }
    };
    fetchStore();
  }, [dispatch]);

  const PartnerSideMenu = () => {
    return (
      <Fragment>
        <div className="card">
          <div className="card-header">Product</div>
          <ul className="list-group list-group-flush">
            <Link to={`${match.url}/product`} className="list-group-item list-group-item-action border-0">
              Product List
            </Link>
            <Link to={`${match.url}/review`} className="list-group-item list-group-item-action border-0">
              Review
            </Link>
          </ul>
        </div>
        <div className="card mt-3">
          <div className="card-header">Profile</div>
          <ul className="list-group list-group-flush">
            <Link to={`${match.url}/profile`} className="list-group-item list-group-item-action border-0">
              User
            </Link>
            <Link to={`${match.url}/store`} className="list-group-item list-group-item-action border-0">
              Store
            </Link>
          </ul>
        </div>
      </Fragment>
    );
  };

  if (Loading) {
    return <Spinner />;
  } else if (Role !== "partner") {
    return <Redirect to="/" />;
  }

  return (
    <div className="partner-wrapper container-fluid my-3">
      <div className="row ml-5 mr-0 mb-5">
        {/* SIDE MENU */}
        <section className="col-md-2 partner-sidemenu">{PartnerSideMenu()}</section>

        {/* CONTENT */}
        <div className="col-md-10 partner-content">
          <div className="ml-0">
            <Route path={`${match.url}/profile`} component={Details} />
            <Route path={`${match.url}/store`} component={Store} />
            <Route path={`${match.url}/product`} exact component={Product} />
            <Route path={`${match.url}/product/add_product`} component={AddProduct} />
            <Route path={`${match.url}/review`} component={Review} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Partner;
