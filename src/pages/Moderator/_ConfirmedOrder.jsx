import React, { useState } from "react";
import Numeral from "numeral";
import { Card, CardBody, CardText, Col, Button, FormGroup, CardTitle, Row, Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { PutPaymentToConfirmed, PutPaymentToPaid } from "../../redux/actions";
import { API_URL } from "../../support/API_URL";
import Swal from "sweetalert2";

export const ConfirmedOrder = () => {
  return (
    <Card>
      <CardBody>
        <CardText className="mb-0 text-center text-uppercase" tag="h4">
          Confirmed Order
        </CardText>
        <div className="dropdown-divider mt-2 mb-0" />
        <CardBody className="py-0" style={{ height: "380px", overflowY: "auto" }}>
          {OrderItem()}
        </CardBody>
      </CardBody>
    </Card>
  );
};

const OrderItem = () => {
  const dispatch = useDispatch();
  const { DataConfirmedOrders, OrderItems, Loading, SelectedId } = useSelector(({ ModOrder }) => {
    return {
      DataConfirmedOrders: ModOrder.dataConfirmedOrders,
      OrderItems: ModOrder.dataOrderItems,
      Loading: ModOrder.loading,
      SelectedId: ModOrder.selected
    };
  });

  const [onCollapse, setOnCollapse] = useState(false);
  const statusColor = status => {
    switch (status) {
      case "Awaiting Payment":
        return "danger";
      case "Awaiting Confirmation":
        return "warning";
      case "Processed":
        return "info";
      case "Shipping":
        return "primary";
      case "Delivered":
        return "success";

      case "Unpaid":
        return "success";
      case "Paid":
        return "warning";
      case "Confirmed":
        return "secondary";

      default:
        return "light";
    }
  };

  function openReceipt(image) {
    Swal.fire({
      imageUrl: `${API_URL + image}`,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Payment receipt image",
      showConfirmButton: false
    });
  }

  function confirmPayment(id) {
    Swal.fire({
      toast: true,
      title: "Confirm payment?",
      icon: "question",
      position: "center",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        dispatch(PutPaymentToConfirmed({ id }));
      }
    });
  }

  function cancelPayment(id) {
    Swal.fire({
      toast: true,
      title: "Cancel payment?",
      icon: "question",
      position: "center",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        dispatch(PutPaymentToPaid({ id }));
      }
    });
  }

  return DataConfirmedOrders.map((order, index) => {
    return (
      <Card className="px-0 my-4" key={order.transid}>
        <CardBody className="py-3">
          <CardTitle className="mb-0 d-flex justify-content-between align-items-center">
            <CardText className="mb-0" tag="h6">
              <small>
                <span className="mr-1">No. Invoice</span>
              </small>
              {order.invoice}
            </CardText>
            <CardText className="mb-0" tag="h6">
              <small>
                <span className="mr-2">Status:</span>
              </small>
              <Button style={{ width: "160px" }} size="sm" color={`${statusColor(order.order_status)}`}>
                {order.order_status}
              </Button>
            </CardText>
          </CardTitle>
          {/* DIVIDER */}
          <div className="dropdown-divider my-2" />
          {/* DIVIDER */}
          <Row>
            <Col sm={12} className="my-2 d-flex justify-content-between align-items-center">
              <CardText className="mb-0">
                <small>Total Price:</small>&nbsp;
                <strong>{`Rp ${Numeral(order.total_price).format("0,0")}`}</strong>
              </CardText>
              <CardText className="mb-0">
                <Button onClick={() => openReceipt(order.payment_receipt)} size="sm" color="info" className="mr-3">
                  Payment Receipt
                </Button>
                {onCollapse !== index ? (
                  <Button className="" onClick={() => setOnCollapse(index)} size="sm">
                    Order Details
                  </Button>
                ) : (
                  <Button className="" onClick={() => setOnCollapse(-1)} size="sm">
                    Order Details
                  </Button>
                )}
              </CardText>
            </Col>
          </Row>

          <Collapse className="mb-2" isOpen={onCollapse === index}>
            {OrderItems.map((item, id) => {
              return item.transid === order.transid ? (
                <Card key={item.transdetailsid}>
                  <CardBody className="p-2">
                    <FormGroup className="row m-0 align-items-center">
                      <Col sm={1}> - </Col>
                      <Col sm={2} className="ml-2 mr-2">
                        <img style={{ borderRadius: "5px", width: "75px" }} src={`${API_URL + item.image}`} alt="" />
                      </Col>
                      <Col sm={4}>
                        <CardText className="mb-0">{item.name}</CardText>
                      </Col>
                      <Col sm={4}>
                        <CardText className="mb-0">
                          <small>{`${item.qty} x Rp ${Numeral(item.price).format("0,0")}`}</small>
                        </CardText>
                      </Col>
                    </FormGroup>
                  </CardBody>
                </Card>
              ) : null;
            })}
          </Collapse>

          {/* DIVIDER */}
          <div className="dropdown-divider my-2" />
          {/* DIVIDER */}

          <Row>
            <Col sm={12} className="d-flex justify-content-between align-items-center">
              {order.payment_status === "Paid" ? (
                <Button onClick={() => confirmPayment(order.transid)} color="success" size="sm" className="mr-3">
                  {Loading && SelectedId === order.transid ? "proccessing..." : "Confirm Payment"}
                </Button>
              ) : order.payment_status === "Confirmed" ? (
                <Button onClick={() => cancelPayment(order.transid)} color="danger" size="sm">
                  {Loading && SelectedId === order.transid ? "proccessing..." : "Cancel Payment"}
                </Button>
              ) : (
                <Button disabled color="secondary" size="sm">
                  Unpaid
                </Button>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  });
};
