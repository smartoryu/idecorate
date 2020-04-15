/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { Spinner } from "../../components/Spinner";
import { Slideshow } from "./_Slideshow";
import { HomeSlider } from "./_HomeSlider";
import { ProductTab } from "./_ProductTab";
import { GetImageSlider, GetImageSlideshow } from "../../redux/actions";

const Homepage = () => {
  const dispatch = useDispatch();
  const { Role, UserId, Username, Loading } = useSelector(({ User, Homepage }) => {
    return {
      Role: User.role,
      UserId: User.id,
      Username: User.username,

      Loading: Homepage.loading,
    };
  });

  useEffect(() => {
    dispatch(GetImageSlider());
    dispatch(GetImageSlideshow());
  }, [dispatch]);

  if (Loading) {
    return <Spinner />;
  } else {
    if (Role === "partner") {
      return <Redirect to={`/p/${UserId}/${Username}/store`} />;
    } else if (Role === "moderator") {
      return <Redirect to={`/mod/${UserId}/${Username}/order`} />;
    } else {
      return (
        <div className="homepage">
          <div className="row no-gutters main-content">
            <div className="slideshow__container col-lg-10 mx-auto">
              <Slideshow />
            </div>

            <div className="flash-sale-title col-md-10 text-center mx-auto" style={{ height: "100px" }}>
              <div className="d-flex mt-5">
                <button className="btn btn-warning mr-auto">Today's Flash Sale</button>
                <button className="btn btn-success ml-auto">Flash Sale Timer</button>
              </div>
            </div>

            <div className="flash-sale-wrapper col-md-10 align-items-center text-center mx-auto">
              <HomeSlider />
            </div>
          </div>

          {/* <div className="row no-gutters col-lg-10 mx-auto product-content">
            <div className="col-md-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius tempore illo vitae excepturi quo minus, pariatur
                sint aut repellat nisi!
              </p>
            </div>
            <div className="col-md-10">
              <div className="ml-2" style={{ maxWidth: "100%", height: "100%" }}>
                <div className="product-tab">
                  <ProductTab />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      );
    }
  }
};

export default Homepage;
