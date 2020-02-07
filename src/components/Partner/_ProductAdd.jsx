import React, { Fragment } from "react";
import { Col, CustomInput, Form, FormGroup, Label, Input } from "reactstrap";
import { FiPlus } from "react-icons/fi";

export function AddProduct(props) {
  return (
    <Fragment>
      <Form>
        <FormGroup row>
          <Label for="product_name" sm={2}>
            Product Name
          </Label>
          <Col sm={10}>
            <Input type="text" name="product_name" id="product_name" placeholder="input product name" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="product_price" sm={2}>
            Price
          </Label>
          <Col sm={10}>
            <Input type="number" name="product_price" id="product_price" placeholder="input price" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="product_type" sm={2}>
            Product type
          </Label>
          <Col sm={10}>
            <Input type="select" name="product_type" id="product_type">
              <option hidden>Select product type</option>
              <option>Chair</option>
              <option>Sofa</option>
              <option>Table</option>
              <option>Cabinet</option>
              <option>Bed</option>
              <option>Pillow</option>
              <option>Accesories</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="product_category" sm={2}>
            Product Category
          </Label>
          <Col sm={10}>
            <CustomInput disabled type="checkbox" id="product_category1" label="Bedroom" />
            <CustomInput disabled type="checkbox" id="product_category2" label="Bathroom" />
            <CustomInput disabled type="checkbox" id="product_category3" label="Dining Room" />
            <CustomInput disabled type="checkbox" id="product_category4" label="Living Room" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="product_about" sm={2}>
            About Product
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="product_about" id="product_about" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Image</Label>
          <Label for="product_image" sm={10}>
            <div className="add_product_icon d-flex">
              <span className="plus_icon">
                <FiPlus />
              </span>
            </div>
          </Label>
          <Col sm={0}>
            <CustomInput
              className="add_product_input"
              type="file"
              id="product_image"
              name="product_image"
              label="select an image!"
            />
          </Col>
        </FormGroup>
      </Form>

      <div className="form-group d-flex">
        <div className="mx-auto">
          <a href="/partner/product" className="btn btn-outline-dark px-3 mr-3 ">
            Cancel
          </a>
          <button onClick={() => console.log("saved")} className="btn btn-secondary px-4">
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
}
