import React from "react";
import Numeral from "numeral";
import Moment from "react-moment";
import { Card, CardBody, CardText, Button, CardSubtitle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { StatusColor } from "../../../support/StatusColor";
import { PickOrderToProccess } from "../../../redux/actions";

export const OrderList = () => {
  return (
    <Card>
      <CardBody>
        <CardText className="mb-0 text-center text-uppercase" tag="h4">
          Order List
        </CardText>
        <div className="dropdown-divider mt-2 mb-0 px-3" />
        <CardBody className="p-0" style={{ height: "380px", overflowY: "auto" }}>
          {AllOrderList()}
        </CardBody>
      </CardBody>
    </Card>
  );
};

const AllOrderList = () => {
  const dispatch = useDispatch();
  const { DataOrders, Loading, SelectedId } = useSelector(({ ModOrder }) => {
    return {
      DataOrders: ModOrder.dataOrders,
      Loading: ModOrder.loading,
      SelectedId: ModOrder.selected
    };
  });

  const handlePickOrder = id => {
    Swal.fire({
      toast: true,
      title: "Proccess this order?",
      icon: "question",
      position: "center-end",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        dispatch(PickOrderToProccess({ id }));
      }
    });
  };

  return DataOrders.map((order, index) => {
    if (order.moderator === null) {
      return (
        <Card className="px-0 my-4" key={order.transid}>
          <Button onClick={() => handlePickOrder(order.transid)} size="sm" color="success" className="m-2 text-center">
            {Loading && SelectedId === order.transid ? "processing..." : `Procces Order: ${order.invoice}`}
          </Button>
          <CardBody className="p-0 px-3 py-2">
            <CardSubtitle className="mb-0 d-flex flex-wrap align-items-center justify-content-between">
              <CardText className="mb-0 mr-2" tag="h6">
                <small>
                  <strong>{`Rp ${Numeral(order.total_price).format("0,0")}`}</strong>
                </small>
              </CardText>
              <CardText className="mb-0" tag="h6">
                <Button style={{ width: "120px", fontSize: "10px" }} size="sm" color={`${StatusColor(order.order_status)}`}>
                  {order.order_status}
                </Button>
              </CardText>
              <CardText className="mt-2 mb-0 mr-2" tag="h6">
                <small>
                  <Moment format="HH:mm:ss - ddd, DD/MM/YYYY" date={order.ordered_time} />
                </small>
              </CardText>
            </CardSubtitle>
          </CardBody>
        </Card>
      );
    } else {
      return null;
    }
  });
};
