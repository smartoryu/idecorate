import React from "react";
import { Col, Row } from "reactstrap";
import { CurrentOrder } from "./_CurrentOrder";
// import { CheckoutComponent } from "./_CheckoutComponent";

export const ManageOrder = () => {
  return (
    <div id="page-content-wrapper">
      <div className="container">
        <Row>
          <Col sm={8}>{CurrentOrder()}</Col>
          {/* <Col sm={5}></Col> */}
        </Row>
      </div>
    </div>
  );
};
