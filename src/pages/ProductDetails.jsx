/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetails } from "../redux/actions";
import ReactStars from "react-stars";
import Numeral from "numeral";

import {
  Breadcrumb,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Badge
} from "reactstrap";
import { Spinner } from "../components/Spinner";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { API_URL } from "../support/API_URL";

export const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { Product, Images, Loading } = useSelector(({ MainNavbar }) => {
    return {
      Product: MainNavbar.productDetails,
      Images: MainNavbar.productImages,
      Loading: MainNavbar.loading
    };
  });
  const parseLink = Product.type && Product.type.toLowerCase();

  useEffect(() => {
    dispatch(GetProductDetails(params.productid));
  }, [dispatch, params.productid]);

  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = tab => activeTab !== tab && setActiveTab(tab);

  const [countBuy, setCountBuy] = useState(1);
  const addCount = () => countBuy > 0 && setCountBuy(countBuy + 1);
  const minCount = () => countBuy > 1 && setCountBuy(countBuy - 1);

  if (Loading) {
    return <Spinner />;
  } else {
    return (
      <div className="px-3">
        {/* BREADCRUMB */}
        <div className="p-breadcrumb">
          <a href="/">Home</a>
          <span>
            <IoIosArrowForward />
          </span>
          <a href={`/p/${parseLink}`}>{Product.type}</a>
          <span>
            <IoIosArrowForward />
          </span>
          <a href="#">Name</a>
        </div>

        <Row className="mx-1">
          {/* IMAGE THUMBNAIL */}
          <Col sm={8} className="pr-5">
            <Row className="image-galery-details">
              <Col sm={2} className="thumb-details">
                <Card>
                  <Nav tabs>
                    {Images.map((image, id) => {
                      return (
                        <NavItem key={image.id}>
                          <NavLink active={activeTab === `${id + 1}`} onMouseEnter={() => toggleTab(`${id + 1}`)}>
                            <img src={`${API_URL + image.image}`} width="100%" alt="..." />
                          </NavLink>
                        </NavItem>
                      );
                    })}
                  </Nav>
                </Card>
              </Col>
              <Col sm={10} className="image-details">
                <Card>
                  <TabContent activeTab={activeTab}>
                    {Images.map((image, id) => {
                      return (
                        <TabPane key={image.id} tabId={`${id + 1}`}>
                          <img src={`${API_URL + image.image}`} width="100%" alt="..." />
                        </TabPane>
                      );
                    })}
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* BUY SECTION */}
          <Col sm={4} className="px-0">
            <Card>
              <CardBody>
                <CardTitle>
                  <h5>{Product.name}</h5>
                  <CardSubtitle>
                    <p>{Product.about}</p>
                  </CardSubtitle>
                  <span className="d-flex align-items-center">
                    <ReactStars count={5} value={4} edit={false} size={16} color2={"#ffd700"} />
                    <span className="ml-2" style={{ fontSize: 14 }}>
                      15 reviews
                    </span>
                  </span>
                </CardTitle>
                <div className="dropdown-divider my-4" />
                <CardSubtitle className="d-flex align-items-center">
                  <h3>Rp {Numeral(Product.price - Product.price * 0.3).format("0,0")}</h3>
                  <strike className="ml-2 text-muted">Rp {Numeral(Product.price).format("0,0")}</strike>
                  <Badge className="ml-2">30% OFF</Badge>
                </CardSubtitle>

                <FormGroup row className="mt-3">
                  <Col sm={4} className="pr-0">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button onClick={minCount} style={{ width: "35px" }} outline>
                          -
                        </Button>
                      </InputGroupAddon>
                      <Input
                        style={{ textAlign: "center" }}
                        maxLength={2}
                        defaultValue={1}
                        value={countBuy}
                        min={1}
                        max={Product.stock}
                      />
                      <InputGroupAddon addonType="append">
                        <Button onClick={addCount} style={{ width: "35px" }} outline>
                          +
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col sm={8}>
                    <Button className="w-100">Buy now!</Button>
                  </Col>
                </FormGroup>
                <div className="dropdown-divider my-4" />
                <Row className="d-flex justify-items-center text-center mx-auto">
                  <Col>
                    <div style={{ width: "50px" }} className="mx-auto">
                      <img
                        width="100%"
                        src="https://fabelio.com/static/version1584632702/frontend/Fabelio/aurela/id_ID/images/icon-usp-guarantee-2yrs.svg"
                        alt=""
                      />
                    </div>
                    <span style={{ fontSize: "0.8rem" }}>Garansi 2 Tahun</span>
                  </Col>
                  <Col>
                    <div style={{ width: "50px" }} className="mx-auto">
                      <img
                        width="100%"
                        src="https://fabelio.com/static/version1584632702/frontend/Fabelio/aurela/id_ID/images/icon-usp-30days.svg"
                        alt=""
                      />
                    </div>
                    <span style={{ fontSize: "0.8rem" }}>30 Hari Gratis Pengembalian</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div style={{ height: "200px" }} />
      </div>
    );
  }
};
