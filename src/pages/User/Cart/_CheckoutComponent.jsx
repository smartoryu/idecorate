import React from "react";
import Numeral from "numeral";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, CardText, CardFooter, Button } from "reactstrap";
import { AddressCard } from "./_AddressCard";
import { AddToOrder } from "../../../redux/actions/OrderActions";
import Swal from "sweetalert2";

export const CheckoutComponent = () => {
  const dispatch = useDispatch();
  const { DataCart, Address, Loading } = useSelector(({ Cart, User, Order }) => {
    return {
      DataCart: Cart.dataCart,
      Address: User.address,

      Loading: Order.loading
    };
  });

  function countPrice() {
    let total = 0;
    DataCart.forEach(item => {
      total += item.price * item.qty;
    });
    return total;
  }

  const handleCheckout = () => {
    Swal.fire({
      toast: true,
      title: "Sure to checkout?",
      icon: "question",
      position: "center-end",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        dispatch(AddToOrder());
      }
    });
  };

  return (
    <Card>
      <CardBody>
        <CardText className="mb-0" tag="h4">
          Checkout
        </CardText>
        <div className="dropdown-divider mt-2 mb-4" />
        <Card>{Address.length ? <Button color="light">{AddressCard()}</Button> : <Button color="light">No address</Button>}</Card>
        <div className="dropdown-divider mt-4 mb-2" />
        <div className="d-flex align-content-center">
          <CardText className="mb-0">
            <small>Total Price</small>
          </CardText>
          <CardText className="mb-0 mx-2">
            <small>:</small>
          </CardText>
          <CardText className="mb-0" tag="h5">
            <strong>Rp {Numeral(countPrice()).format("0,0")}</strong>
          </CardText>
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={handleCheckout} block className="btn btn-secondary text-center my-2">
          {Loading ? "processing..." : "Checkout"}
        </Button>
      </CardFooter>
    </Card>
  );
};
