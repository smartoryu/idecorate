import React from "react";
import { Col, Row } from "reactstrap";
import { CurrentOrder } from "./_CurrentOrder";
import { OrderList } from "./_OrderList";

export const ManageOrder = () => {
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Row>
          <Col sm={8}>{CurrentOrder()}</Col>
          <Col sm={4}>{OrderList()}</Col>
        </Row>
      </div>
    </div>
  );
};
