/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Col, Row } from "reactstrap";
import { OrderList } from "./_OrderList";

export const Order = () => {
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Row>
          <Col sm={10}>
            <OrderList />
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    </div>
  );
};
