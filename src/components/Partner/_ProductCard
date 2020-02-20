import React from "react";

function ProductCard(props) {
  let { image, title, date, price } = props;

  return (
    <div className="card" style={{ maxWidth: "250px" }}>
      <img className="card-img-top" src={`${image}`} alt="product_card" />
      <div className="card-body">
        <h6 className="card-title">{`${title}`}</h6>
        <p>{`Rp ${price}`}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">{`Uploaded on ${date}`}</small>
      </div>
    </div>
  );
}

export default ProductCard;
