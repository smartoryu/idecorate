/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { FaPhone, FaEnvelope } from "react-icons/fa";

import MenuBrand from "./MenuBrand";
import MenuDropdown from "./MenuDropdown";
import MenuWishlist from "./MenuWishlist";
import MenuCart from "./MenuCart";
import MenuAccount from "./MenuAccount";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar className="top-navbar" light expand="md">
        <div className="d-flex contact">
          <span className="navbar-text">
            <FaPhone /> +6281237689689 <FaEnvelope /> dummy@email.com
          </span>
        </div>
        <Nav className="mx-auto" navbar>
          <div className="social-media"></div>
        </Nav>
        <div className="d-flex">Hi, Account!</div>
      </Navbar>

      <Navbar className="navbar__container" light expand="md">
        <div className="d-flex">
          <MenuBrand />
          <MenuDropdown />
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <div className="search__container">
              <input type="search" className="search__input" placeholder="Search" />
            </div>
          </Nav>
          <div className="d-flex">
            <MenuWishlist />
            <MenuCart />
            <MenuAccount />
          </div>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Menu;
