import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";

import { Product } from "../components/Partner/_Product";
import { AddProduct } from "../components/Partner/_ProductAdd";
import { Profile } from "../components/Partner/_Profile";
import { Review } from "../components/Partner/_Review";

function Partner({ match }) {
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
          <div className="card-header">Partner</div>
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
      <div className="row mx-5 mb-5">
        {/* SIDE MENU */}
        <section className="col-md-2 partner-sidemenu">{PartnerSideMenu()}</section>

        {/* CONTENT */}
        <div className="col-md-10 partner-content">
          {/* <div className="d-flex">
            <Link to={`${match.url}/add_product`} className="btn btn-outline-secondary btn-sm mx-auto mb-3">
              Add Product
            </Link>
          </div> */}
          <div className="ml-5">
            <Route exact path={`${match.url}/`} component={Profile} />
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
