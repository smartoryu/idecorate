import React, { useState } from "react";
import Numeral from "numeral";
import { Card, CardBody, CardText, Col, Button, Input, InputGroup, InputGroupAddon, FormGroup } from "reactstrap";
import { API_URL } from "../../../support/API_URL";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFromCart, UpdateCartItem } from "../../../redux/actions";
import { UPDATE_QTY_START } from "../../../support/types";

export const CartComponent = () => {
  return (
    <Card>
      <CardBody>
        <CardText className="mb-0 text-center text-uppercase" tag="h4">
          Cart
        </CardText>
        <div className="dropdown-divider mt-2 mb-4" />
        {CartItem()}
      </CardBody>
    </Card>
  );
};

const CartItem = () => {
  const dispatch = useDispatch();
  const { DataCart, Loading, Editing } = useSelector(({ Cart }) => {
    return {
      DataCart: Cart.dataCart,
      Loading: Cart.loading,
      Editing: Cart.editItem
    };
  });

  const [countBuy, setCountBuy] = useState(1);
  const addCount = () => countBuy < 5 && setCountBuy(countBuy + 1);
  const minCount = () => countBuy > 1 && setCountBuy(countBuy - 1);

  const [isDeleteCart, setIsDeleteCart] = useState(false);
  const [isEditCart, setIsEditCart] = useState(false);
  const [selectedCart, setSelectedCart] = useState(0);

  function toggleDeleteCart(id, status) {
    setIsDeleteCart(status);
    setSelectedCart(id);
  }

  function toggleEditCart(id, status) {
    dispatch({ type: UPDATE_QTY_START });
    setIsEditCart(status);
    setSelectedCart(id);
    setCountBuy(1);
  }

  function deleteCartItem(transdetailsid) {
    dispatch(DeleteFromCart(transdetailsid));
  }

  function editCartItem(transdetailsid) {
    let putData = { qty: countBuy };
    dispatch(UpdateCartItem({ transdetailsid, putData }));
  }

  return DataCart.map(cart => {
    return (
      <Card key={cart.transdetailsid} className="px-0 mb-2">
        <CardBody className="p-0 align-content-center">
          <FormGroup className=" mx-1 mt-4 mb-3 row align-items-center">
            <Col sm={4} className="mr-2">
              <img style={{ borderRadius: "5px", height: "75px" }} src={`${API_URL + cart.image}`} alt="..." />
            </Col>
            <Col sm={5} className="">
              <CardText className="">{cart.name}</CardText>
              {Editing && isEditCart && selectedCart === cart.transdetailsid ? (
                <InputGroup style={{ width: "120px" }}>
                  <InputGroupAddon addonType="prepend">
                    <Button onClick={minCount} style={{ width: "35px" }} outline>
                      -
                    </Button>
                  </InputGroupAddon>
                  <Input
                    style={{ textAlign: "center" }}
                    maxLength={2}
                    onChange={({ target }) => setCountBuy(target.value)}
                    value={countBuy}
                    min={1}
                    max={5}
                  />
                  <InputGroupAddon addonType="append">
                    <Button onClick={addCount} style={{ width: "35px" }} outline>
                      +
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              ) : (
                <CardText>{`${cart.qty} x Rp ${Numeral(cart.price).format("0,0")}`}</CardText>
              )}
            </Col>
            {Editing && isDeleteCart && selectedCart === cart.transdetailsid ? (
              <Col sm={2} className="d-block">
                <button
                  onClick={() => toggleDeleteCart(0, false)}
                  style={{ fontSize: "12px", width: "75px" }}
                  className="btn btn-sm btn-outline-dark my-2">
                  No
                </button>
                <button
                  onClick={() => deleteCartItem(cart.transdetailsid)}
                  style={{ fontSize: "12px", width: "75px" }}
                  className="btn btn-sm btn-danger my-2">
                  {Loading ? "deleting..." : "Yes"}
                </button>
              </Col>
            ) : Editing && isEditCart && selectedCart === cart.transdetailsid ? (
              <Col sm={2} className="d-block">
                <button
                  onClick={() => editCartItem(cart.transdetailsid)}
                  style={{ fontSize: "12px", width: "90px" }}
                  className="btn btn-sm btn-primary my-2">
                  {Loading ? "saving..." : "Save"}
                </button>
                <button
                  onClick={() => toggleEditCart(0, false)}
                  style={{ fontSize: "12px", width: "90px" }}
                  className="btn btn-sm btn-outline-dark my-2">
                  Cancel
                </button>
              </Col>
            ) : (
              <Col sm={2} className="d-block">
                <button
                  onClick={() => toggleDeleteCart(cart.transdetailsid, true)}
                  style={{ fontSize: "12px", width: "90px" }}
                  className="btn btn-sm btn-outline-danger my-2">
                  Delete Item
                </button>
                <button
                  onClick={() => toggleEditCart(cart.transdetailsid, true)}
                  style={{ fontSize: "12px", width: "90px" }}
                  className="btn btn-sm btn-outline-primary my-2">
                  Edit Qty
                </button>
              </Col>
            )}
          </FormGroup>
        </CardBody>
      </Card>
    );
  });
};
