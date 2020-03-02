/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const HomeSlider = () => {
  const Pict1 =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  const Pict2 =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  const Pict3 =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  const NextArrow = props => {
    const { className, style, onClick } = props;
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

  const PrevArrow = props => {
    const { className, style, onClick } = props;
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
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="home-slider">
      <h2> Multiple items </h2>
      <Slider {...settings}>
        <div className="card" style={{ width: "18rem" }}>
          <img src={Pict1} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card 1</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <button className="btn btn-secondary">Go somewhere</button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={Pict2} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card 2</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <button className="btn btn-secondary">Go somewhere</button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={Pict3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card 3</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <button className="btn btn-secondary">Go somewhere</button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={Pict1} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card 4</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <button className="btn btn-secondary">Go somewhere</button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={Pict2} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card 5</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <button className="btn btn-secondary">Go somewhere</button>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={Pict3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card 6</h5>
            <p className="card-text">Lorem ipsum dolor sit amet.</p>
            <button className="btn btn-secondary">Go somewhere</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};
