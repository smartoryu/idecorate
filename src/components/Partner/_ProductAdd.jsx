/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useCallback, useReducer } from "react";
// import { useDropzone } from "react-dropzone";
import {
  Col,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardFooter,
  Button,
  Tooltip
} from "reactstrap";
import { MdAdd } from "react-icons/md";
import Dropzone from "react-dropzone-uploader";

import "react-dropzone-uploader/dist/styles.css";
import { API_URL } from "../../support/API_URL";

export function AddProduct() {
  // const [addImage, setAddImage] = useState([]);
  const [product, setProduct] = useState({});
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const [addImage, dispatch] = useReducer((addImage, { type, value }) => {
    switch (type) {
      case "add":
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
      dispatch({ type: "add", value: { FileName: File.name, File } });
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

  console.log(addImage);

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

        <FormGroup id="form-image" row>
          <Label sm={2}>Image</Label>
          <Col className="d-flex" sm={10}>
            <Input
              onChange={({ target }) => handleAddImage(Array.from(target.files))}
              id="product_image"
              className="add_product_input"
              // multiple
              max={4}
              accept="image/png, image/jpeg"
              type="file"
            />
            {/* <Label sm={12}>{AddImageDropzone()}</Label> */}

            {addImage.length > 0 &&
              addImage.map((image, id) => {
                return (
                  <Label sm={2} key={id} id={"img-" + id}>
                    <div className="add_product_preview">
                      <img
                        onClick={() => dispatch({ type: "remove", value: id })}
                        src={URL.createObjectURL(image.File)}
                        className="plus_icon overflow-hidden"
                        alt=""
                      />
                    </div>
                    <div className="remove_icon text-center">
                      <Tooltip placement="bottom" isOpen={tooltipOpen} target={"img-" + id} toggle={toggleTooltip}>
                        Click to remove!
                      </Tooltip>
                    </div>
                  </Label>

                  // <Label sm={3} key={id}>
                  //   <Card className="add_product_card">
                  //     <span
                  //       onClick={() => dispatch({ type: "remove", value: id })}
                  //       className="float-right"
                  //       style={{ cursor: "pointer" }}>
                  //       x
                  //     </span>
                  //     <CardImg top width="100%" src={URL.createObjectURL(image.File)} alt="product" />
                  //     <CardBody>
                  //       <CardText onClick={() => dispatch({ type: "remove", value: id })} style={{ cursor: "pointer" }}>
                  //         {image.FileName}
                  //       </CardText>
                  //       <Button className="float-right" onClick={() => dispatch({ type: "remove", value: id })}>
                  //         x
                  //       </Button>
                  //     </CardBody>
                  //   </Card>
                  // </Label>

                  // <Label sm={3} key={id}>
                  //   <div className="add_product_icon">
                  //     <img src={URL.createObjectURL(image.File)} className="plus_icon" alt="" />
                  //   </div>
                  // </Label>
                );
              })}
            {/* <Label for="product_image" sm={2}>
              <div className="add_product_icon">
                <img
                  onClick={() => dispatch({ type: "remove", value: id })}
                  height="100%"
                  src="https://lh3.googleusercontent.com/proxy/_Aa-XCNpidMCVNDGlG442IMU-Bc-OopXJWolFOSwJVZ8woNXdm7-xOOcb4192Al6U_ctNs-ldE7dT_K95OC3moKr2vIeNjZqx4ZQPRaSjKmFH_97tlrL"
                  className="plus_icon overflow-hidden"
                  alt=""
                />
              </div>
            </Label> */}
            {addImage.length < 4 && (
              <Label for="product_image" sm={2}>
                <div className="add_product_icon">
                  <MdAdd height="100%" className="plus_icon" />
                </div>
              </Label>
            )}
          </Col>
        </FormGroup>
      </Form>

      {/* <FormGroup id="form-images" row>
          <Label sm={2}>Image</Label>
          <Col sm={10}>
            <Label className="px-0 d-flex" sm={12}>
              <div className="add_product_icon d-flex">
                <div {...getRootProps()} className="m-auto">
                  <input {...getInputProps()} />
                  {!isDragActive && "Click here or drop a file to upload!"}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                  {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
                </div>
              </div>
            </Label>

            <div className="mt-3 d-flex">
              {addImage.length > 0 &&
                addImage.map((acceptedFile, id) => {
                  return (
                    <Card className="add_product_card">
                      <span
                        onClick={() => dispatch({ type: "remove", value: id })}
                        className="float-right"
                        style={{ cursor: "pointer" }}>
                        x
                      </span>
                      <CardImg top width="100%" src={URL.createObjectURL(acceptedFile.File)} alt="product" />
                      <CardBody>
                        <CardText>{acceptedFile.FileName}</CardText>
                      </CardBody>
                    </Card>
                  );
                })}
            </div>
            <CustomInput
              sm={0}
              className="add_product_input"
              type="file"
              id="product_image"
              name="product_image"
              label="select an image!"
            />
          </Col>
        </FormGroup> */}

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

// const AddImageDropzone = () => {
//   const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
//     return (
//       <div>
//         {/* <div {...dropzoneProps}>{files.length < maxFiles && input}</div> */}
//         <div {...dropzoneProps}>
//           {/* {input} */}
//           {previews}
//           {files.length < maxFiles && input}
//           {/* {files.length > 0 && submitButton} */}
//         </div>
//       </div>
//     );
//   };

//   const getUploadParams = ({ meta }) => {
//     const url = API_URL;
//     return { url, meta: { fileUrl: `${URL.createObjectURL(meta.name)}` } };
//   };

//   const handleChangeStatus = ({ meta, remove }, status) => {
//     console.log(status, meta);
//     if (status === "header_received") remove();
//   };

//   const handleSubmit = (files, allFiles) => {
//     console.log(files.map(File => File.meta));
//     allFiles.forEach(File => dispatch({ type: "add", value: { FileName: File.name, File } }));
//     // allFiles.forEach(f => f.remove())
//   };

//   console.log(addImage);

//   return (
//     <Dropzone
//       // getUploadParams={getUploadParams}
//       onChangeStatus={handleChangeStatus}
//       addClassNames={{ dropzone: "add_product_icon" }}
//       classNames={{ preview: "add_product_preview" }}
//       onSubmit={handleSubmit}
//       maxFiles={4}
//       accept="image/png, image/jpeg"
//       inputContent={(files, extra) => (extra.reject ? "Image files only" : "Drag Files")}
//       styles={{
//         dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
//         inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {})
//       }}
//     />

//     // <Dropzone
//     //   getUploadParams={getUploadParams}
//     //   onChangeStatus={handleChangeStatus}
//     //   classNames={{ inputLabel: "add_product_input", dropzone: "add_product_icon", preview: "add_product_preview" }}
//     //   LayoutComponent={Layout}
//     //   onSubmit={handleSubmit}
//     //   accept="image/png, image/jpeg"
//     //   inputContent={(files, extra) => (extra.reject ? "Image files only" : "Drag Files")}
//     //   styles={{
//     //     dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
//     //     inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {})
//     //   }}
//     // />
//   );
// };
