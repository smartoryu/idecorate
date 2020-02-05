/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaRegHeart,
  FaShoppingCart,
  FaRegUser,
  FaGlobe,
  FaCcAmex,
  FaCreditCard,
  FaPaypal,
  FaCcVisa
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <h4 className="title">GET IN TOUCH</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit, libero a molestie consectetur,
              sapien elit lacinia mi.
            </p>
            <ul className="social-icon">
              <a href="#" className="social">
                <FaFacebookF />
              </a>
              <a href="#" className="social">
                <FaTwitter />
              </a>
              <a href="#" className="social">
                <FaInstagram />
              </a>
              <a href="#" className="social">
                <FaYoutube />
              </a>
              <a href="#" className="social">
                <FaGithub />
              </a>
            </ul>
          </div>
          <div className="col-sm-3">
            <h4 className="title">My Account</h4>
            <span className="account-icon">
              <a href="/wishlist">
                <FaRegHeart /> Wishlist
              </a>
              <a href="#">
                <FaShoppingCart /> Cart
              </a>
              <a href="#">
                <FaRegUser /> Profile
              </a>
              <a href="#">
                <FaGlobe /> Language
              </a>
            </span>
          </div>
          <div className="col-sm-3">
            <h4 className="title">Category</h4>
            <div className="category">
              <a href="#">men</a>
              <a href="#">women</a>
              <a href="#">men</a>
              <a href="#">women</a>
              <a href="#">men</a>
              <a href="#">women</a>
            </div>
          </div>
          <div className="col-sm-3">
            <h4 className="title">Payment Methods</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <ul className="payment">
              <li>
                <a href="#">
                  <FaCcAmex />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaCreditCard />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaPaypal />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaCcVisa />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row text-center">
          <span>
            © 2020. Made with luv by <a href="/">smartoryu</a>. All right reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
