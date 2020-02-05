import React from "react";

function ProductTable(props) {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="text-center">
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">About</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      {props.children}
    </table>
  );
}

export default ProductTable;
