import React from "react";
import { Col, Row } from "reactstrap";
import { ProductOrdered } from "./_ProductOrdered";
// import { OrderList } from "./_OrderList";

export const Transactions = () => {
  return (
    <div id="page-content-wrapper">
      <div className="container-fluid">
        <Row>
          <Col sm={8}>
            <ProductOrdered />
          </Col>
          {/* <Col sm={4}>{OrderList()}</Col> */}
        </Row>
      </div>
    </div>
  );
};
