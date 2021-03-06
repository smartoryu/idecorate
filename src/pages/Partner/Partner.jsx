/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button, Badge } from "reactstrap";

import { Details } from "./_Details";
import { Product } from "./_Product";
import { AddProduct } from "./_ProductAdd";
import { Store } from "./_Store";
import { Review } from "./_Review";
import { Transactions } from "./Transactions/Transactions";

import { Spinner } from "../../components/Spinner";
import { FetchProduct, FetchTypes } from "../../redux/actions/ProductActions";

function Partner({ match }) {
  const dispatch = useDispatch();
  const { Loading, DataProduct, Role, Logout, ModalStore, StoreId } = useSelector(({ Auth, User, Product, Store }) => {
    return {
      Loading: Store.loading,

      DataProduct: Product.dataProduct,
      ModalStore: Store.modalStore,
      StoreId: Store.storeid,
      Role: User.role,
      Logout: User.logout,
    };
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(FetchProduct(token));
      dispatch(FetchTypes(token));
    }
  }, [StoreId, dispatch]);

  if (Loading) {
    return <Spinner />;
  } else {
    if (Role !== "partner" || Logout) {
      return <Redirect to="/" />;
    } else {
      return (
        <Fragment>
          {ModalCreateStore({ ModalStore, match })}

          <div className="partner-wrapper container-fluid my-3">
            <div className="row ml-5 mr-0 mb-5">
              {/* SIDE MENU */}
              <section className="col-md-2 partner-sidemenu">{PartnerSideMenu({ match, DataProduct })}</section>

              {/* CONTENT */}
              <div className="col-md-10 partner-content">
                <div className="ml-0">
                  <Route path={`${match.url}/profile`} component={Details} />
                  <Route path={`${match.url}/store`} component={Store} />
                  <Route path={`${match.url}/transactions`} component={Transactions} />
                  <Route path={`${match.url}/product`} exact component={Product} />
                  <Route path={`${match.url}/product/add_product`} component={AddProduct} />
                  <Route path={`${match.url}/review`} component={Review} />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

const PartnerSideMenu = ({ match, DataProduct }) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Product Catalog</div>
        <ul className="list-group list-group-flush">
          <Link to={`${match.url}/product`} className="list-group-item list-group-item-action border-0">
            Product List <Badge color="primary">{DataProduct.length}</Badge>
          </Link>
          <Link to={`${match.url}/review`} className="list-group-item list-group-item-action border-0">
            Review
          </Link>
        </ul>
      </div>
      <div className="card mt-3">
        <div className="card-header">Transactions</div>
        <ul className="list-group list-group-flush">
          <Link to={`${match.url}/transactions`} className="list-group-item list-group-item-action border-0">
            Product Ordered
          </Link>
          <Link to={`${match.url}/store`} className="list-group-item list-group-item-action border-0">
            Report
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

const ModalCreateStore = ({ ModalStore }) => {
  return (
    <Modal centered size="sm" isOpen={ModalStore}>
      <ModalBody>Complete your store data first!</ModalBody>
      <ModalFooter>
        <Link to="/new_store">
          <Button className="btn btn-secondary">Ok</Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
};

export default Partner;
