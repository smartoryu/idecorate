import React from "react";
import { useSelector } from "react-redux";
import { CardBody, CardText, Badge } from "reactstrap";

export const AddressCard = () => {
  const { Label, Receiver, Phone, Address } = useSelector(({ User }) => {
    return {
      Label: User.label,
      Receiver: User.receiver,
      Phone: User.phone,
      Address: User.address
    };
  });

  return (
    <CardBody>
      <CardText tag="h6" className="mb-2">
        Address &nbsp;
        <Badge pill color="primary">
          Default
        </Badge>
      </CardText>
      <CardText className="mb-0">
        <span className="font-weight-bold">{Receiver}</span> (<small>{Label}</small>)
      </CardText>
      <CardText className="mb-0">
        <small>{Phone}</small>
      </CardText>
      <CardText>
        <small className="text-muted">{Address}</small>
      </CardText>
    </CardBody>
  );
};
