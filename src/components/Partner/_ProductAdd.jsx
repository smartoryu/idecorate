/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useCallback, useReducer } from "react";
import { useDropzone } from "react-dropzone";
import { Col, CustomInput, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from "reactstrap";

export function AddProduct() {
  // const [addImage, setAddImage] = useState([]);
  const [product, setProduct] = useState({});

  const [addImage, dispatch] = useReducer((addImage, { type, value }) => {
    switch (type) {
      case "add":
        console.log(value);

        return [...addImage, value];
      case "remove":
        return addImage.filter((_, index) => index !== value);
      default:
        return addImage;
    }
  }, []);

  const handleAddImage = acceptedFiles => {
    // console.log(acceptedFiles);
    acceptedFiles.forEach(File => {
      // console.log("File", File);
      dispatch({ type: "add", value: { FileName: File.name, File } });
      // setAddImage(addImage => [...addImage, { FileName: File.name, File }]);
    });
  };

  const handleAddProduct = () => {
    let formData = new FormData();
    let Headers = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    let data = {
      name: product.name,
      price: product.price,
      type: product.type,
      about: product.about
    };

    formData.append("image", addImage.File);
    formData.append("data", JSON.stringify(data));

    console.log(formData);
  };

  const onDrop = useCallback(acceptedFiles => {
    // console.log("files", acceptedFiles);
    handleAddImage(acceptedFiles);
  }, []);
  const maxSize = 5242880;
  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg",
    minSize: 0,
    maxSize
  });
  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  console.log("arr", addImage);

  return (
    <Fragment>
      <Form>
        <FormGroup id="form-name" row>
          <Label for="product_name" sm={2}>
            Product Name
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, name: e.target.value })}
              type="text"
              name="product_name"
              id="product_name"
              placeholder="input product name"
            />
          </Col>
        </FormGroup>

        <FormGroup id="form-price" row>
          <Label for="product_price" sm={2}>
            Price
          </Label>
          <Col sm={10}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Rp</InputGroupAddon>
              <Input
                onChange={e => setProduct({ ...product, price: e.target.value })}
                name="product_price"
                id="product_price"
                placeholder="input price"
                min={0}
                max={100}
                type="number"
                step="1"
              />
              <InputGroupAddon addonType="append">.00</InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup id="form-type" row>
          <Label for="product_type" sm={2}>
            Product type
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, type: e.target.value })}
              type="select"
              name="product_type"
              id="product_type">
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

        <FormGroup id="form-category" row>
          <Label for="product_category" sm={2}>
            Product Category
          </Label>
          <Col sm={10}>
            <CustomInput type="checkbox" id="product_category1" label="Bedroom" />
            <CustomInput type="checkbox" id="product_category2" label="Bathroom" />
            <CustomInput type="checkbox" id="product_category3" label="Dining Room" />
            <CustomInput type="checkbox" id="product_category4" label="Living Room" />
          </Col>
        </FormGroup>

        <FormGroup id="form-about" row>
          <Label for="product_about" sm={2}>
            About Product
          </Label>
          <Col sm={10}>
            <Input
              onChange={e => setProduct({ ...product, about: e.target.value })}
              type="textarea"
              name="product_about"
              id="product_about"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Image</Label>
          <Col sm={10}>
            <Label className="px-0" sm={12}>
              <div className="add_product_icon w-100 text-center">
                <div {...getRootProps()}>
                  <input {...getInputProps()} className="my-auto" />
                  {!isDragActive && "Click here or drop a file to upload!"}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                  {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
                </div>
              </div>
            </Label>
            <ul className="list-group mt-3">
              {addImage.length > 0 &&
                addImage.map((acceptedFile, id) => {
                  return (
                    <ul key={id}>
                      <li className="list-group-item list-group-item-success mt-1">
                        <img style={{ width: 100 }} src={URL.createObjectURL(acceptedFile.File)} alt="gambar" />
                        {acceptedFile.FileName}
                        <span
                          onClick={() => dispatch({ type: "remove", value: id })}
                          className="float-right"
                          style={{ cursor: "pointer" }}>
                          x
                        </span>
                      </li>
                    </ul>
                  );
                })}
            </ul>
            <CustomInput
              sm={0}
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
          <button onClick={handleAddProduct} className="btn btn-secondary px-4">
            Save
          </button>
        </div>
      </div>
    </Fragment>
  );
}
