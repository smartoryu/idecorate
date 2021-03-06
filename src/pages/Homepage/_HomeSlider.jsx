/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { API_URL } from "../../support/API_URL";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Input } from "reactstrap";
import Numeral from "numeral";
import { Link } from "react-router-dom";

export const HomeSlider = () => {
  const ImagesSlider = useSelector(({ Homepage }) => Homepage.imagesSlider);
  const [quantity, setQuantity] = useState(1);

  const NextArrow = ({ className, style, onClick }) => {
    return (
      <IoIosArrowForward
        className={className}
        style={{
          ...style,
          display: "block",
          color: "#FFA136",
          background: "#F6F6F6",
          padding: "11px",
          height: "50px",
          width: "40px"
        }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <IoIosArrowBack
        className={className}
        style={{
          ...style,
          display: "block",
          color: "#FFA136",
          background: "#F6F6F6",
          padding: "11px",
          height: "50px",
          width: "40px",
          zIndex: "2"
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 750,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 2,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  // const loopSelect = stock => {
  //   let arr = [];
  //   for (let i = 0; i < stock; i++) {
  //     arr.push(
  //       <option key={i} value={i + 1}>
  //         {i + 1}
  //       </option>
  //     );
  //   }
  //   return arr;
  // };

  return (
    <div className="home-slider">
      <h2> Bed's Choice! </h2>
      <Slider {...settings}>
        {ImagesSlider.map(image => {
          return (
            <Card key={image.productid}>
              <Link target="_blank" to={`d/${image.productid}/${image.name.replace(/ /gi, "-").toLowerCase()}`}>
                <CardImg top width="100%" src={`${API_URL + image.src}`} alt={image.name} />
              </Link>
              <CardBody>
                <CardTitle>
                  <h5>{image.name}</h5>
                </CardTitle>
                <CardSubtitle>
                  {/* <strike>Rp {Numeral(image.price).format("0,0.00")}</strike> */}
                  Rp {Numeral(image.price).format("0,0.00")}
                </CardSubtitle>
                {/* <CardSubtitle>Rp {Numeral(image.price - image.price * 0.3).format("0,0.00")}</CardSubtitle> */}
                <CardText>
                  <small>{image.about}</small>
                </CardText>
                <Link target="_blank" to={`d/${image.productid}/${image.name.replace(/ /gi, "-").toLowerCase()}`}>
                  <Button size="sm">Buy!</Button>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};
