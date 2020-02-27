import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";

import { Product } from "../components/Partner/_Product";
import { AddProduct } from "../components/Partner/_ProductAdd";
import { Profile } from "../components/Partner/_Profile";
import { Review } from "../components/Partner/_Review";
import Axios from "axios";
import { API_URL } from "../support/API_URL";
import { STORE_GET } from "../support/types";

function Partner({ match }) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.partner.id);

  useEffect(() => {
    dispatch({ type: "RESET_PRODUCT" });
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        let { data } = await Axios.get(`${API_URL}/partner?userid=${userId}`);
        dispatch({ type: STORE_GET, payload: data.result });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStore();
  }, [userId, dispatch]);

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
          <div className="card-header">Store</div>
          <ul className="list-group list-group-flush">
            <Link to={`${match.url}`} className="list-group-item list-group-item-action border-0">
              Profile
            </Link>
          </ul>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="partner-wrapper container-fluid my-3">
      <div className="row ml-5 mr-0 mb-5">
        {/* SIDE MENU */}
        <section className="col-md-2 partner-sidemenu">{PartnerSideMenu()}</section>

        {/* CONTENT */}
        <div className="col-md-10 partner-content">
          <div className="ml-0">
            <Route path={`${match.url}/`} component={Profile} exact />
            <Route path={`${match.url}/product`} component={Product} />
            <Route path={`${match.url}/add_product`} component={AddProduct} />
            <Route path={`${match.url}/review`} component={Review} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Partner;
