import React from "react";
import { Col, Row } from "reactstrap";
import { CartComponent } from "./_CartComponent";
import { CheckoutComponent } from "./_CheckoutComponent";

export const Cart = () => {
  return (
    <div id="page-content-wrapper">
      <div className="container">
        <Row>
          <Col sm={7}>{CartComponent()}</Col>
          <Col sm={5}>{CheckoutComponent()}</Col>
        </Row>
      </div>
    </div>
  );
};
