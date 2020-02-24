/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../support/API_URL";

let img =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22239%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20239%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1700a058f9b%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1700a058f9b%22%3E%3Crect%20width%3D%22239%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2288.75%22%20y%3D%2295.1%22%3E239x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

export const Product = () => {
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const { data } = await Axios.get(`${API_URL}/product`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProduct();
  // }, []);

  return (
    <div id="page-content-wrapper">
      <div className="d-flex">
        <Link to="/partner/add_product" className="btn btn-outline-secondary btn-sm mx-auto mb-3">
          Add Product
        </Link>
      </div>
      <div className="container-fluid">
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
          <tbody>
            <tr className="text-center">
              <td>0</td>
              <td>
                <button className="btn btn-sm btn-outline-dark">click to open!</button>
              </td>
              <td>Dummy Data</td>
              <td>Rp 297.000</td>
              <td style={{ maxWidth: "200px" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam iste laboriosam aut in ab. Vel?
              </td>
              <td>
                <button className="btn btn-sm btn-outline-dark">click to open!</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
