import React, { useState } from "react";
import Numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Button, Card, CardBody, CardText, FormGroup, Col, CardTitle, Row } from "reactstrap";
import { API_URL } from "../../../support/API_URL";
import { PostReceipt, DeleteReceipt } from "../../../redux/actions";

export const OrderList = () => {
  return (
    <Card>
      <CardBody>
        <CardText className="mb-0 text-center text-uppercase" tag="h4">
          Order
        </CardText>
        <div className="dropdown-divider mt-2 mb-4" />
        {OrderItem()}
      </CardBody>
    </Card>
  );
};

const OrderItem = () => {
  const dispatch = useDispatch();
  const { DataOrders, OrderItems } = useSelector(({ Order }) => {
    return {
      DataOrders: Order.dataOrders,
      OrderItems: Order.dataOrderItems
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

  function handleUploadReceipt({ invoice, id }) {
    dispatch(PostReceipt({ invoice, id }));
  }

  function openReceipt(image, id) {
    dispatch(DeleteReceipt({ image, id }));
  }

  return DataOrders.map((order, index) => {
    return (
      <Card key={order.transid} className="px-0 my-4">
        <CardBody className="py-3">
          <CardTitle className="mb-0 d-flex justify-content-between align-items-center">
            <CardText className="mb-0" tag="h6">
              <small>
                <span className="mr-1">No. Invoice:</span>
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
            <Col sm={12}>
              <CardText className="mb-2">
                <small>Total Price:</small>&nbsp;
                <strong>{`Rp ${Numeral(order.total_price).format("0,0")}`}</strong>
              </CardText>
            </Col>
            <Col sm={8} className="d-flex mb-3">
              <Button
                size="sm"
                onClick={() => handleUploadReceipt({ invoice: order.invoice, id: order.transid })}
                disabled={order.payment_status !== "Unpaid"}
                color={`${statusColor(order.payment_status)}`}
                className="mr-3">
                {order.payment_status === "Unpaid"
                  ? "Upload Payment Receipt"
                  : order.payment_status === "Paid"
                  ? "Awaiting Confirmation"
                  : "Payment confirmed"}
              </Button>
              {order.payment_status !== "Unpaid" ? (
                <Button onClick={() => openReceipt(order.payment_receipt, order.transid)} size="sm" color="info" className="mr-3">
                  Payment Receipt
                </Button>
              ) : null}
              {onCollapse !== index ? (
                <Button className="" onClick={() => setOnCollapse(index)} size="sm">
                  Order Details
                </Button>
              ) : (
                <Button className="" onClick={() => setOnCollapse(-1)} size="sm">
                  Order Details
                </Button>
              )}
            </Col>
          </Row>

          <Collapse isOpen={onCollapse === index}>
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
        </CardBody>
      </Card>
    );
  });
};
