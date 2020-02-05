/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useState /* useEffect */ } from "react";
import { Navbar, Nav } from "reactstrap";
import { useSelector } from "react-redux";

import { FaPhone, FaEnvelope } from "react-icons/fa";
import MenuBrand from "./Menu/MenuBrand";
import MenuDropdown from "./Menu/MenuDropdown";
import MenuWishlist from "./Menu/MenuWishlist";
import MenuCart from "./Menu/MenuCart";
import MenuAccount from "./Menu/MenuAccount";

const Menu = () => {
  const AuthLogin = useSelector(state => state.auth.login);
  const Name = useSelector(state => state.auth.name);
  const Role = useSelector(state => state.auth.role);

  // console.log(AuthLogin);
  // console.log(Role);
  return (
    <header>
      {/* =========================== TOP NAVBAR =========================== */}
      <Navbar className="top-navbar" light expand="md">
        <div className="d-flex contact">
          <span className="navbar-text">
            <span className="mr-3">
              <FaPhone /> +6281237689689
            </span>
            <span className="mr-1">
              <FaEnvelope />
            </span>
            dummy@email.com
          </span>
        </div>
        <Nav className="mx-auto" navbar>
          <div className="social-media"></div>
        </Nav>
        {AuthLogin ? <div className="d-flex">{`Hi, ${Name}!`}</div> : <div className="d-flex">Hi, Account!</div>}
      </Navbar>

      {/* ============================= NAVBAR ============================= */}
      <Navbar className="navbar__container" light expand="md">
        <div className="d-flex">
          <MenuBrand />
          <MenuDropdown />
        </div>
        <Nav className="mx-auto" navbar>
          <div className="search__container px-2">
            <input type="search" className="search__input mx-2" placeholder="Search" />
          </div>
        </Nav>
        {Role === "admin" ? (
          <Nav className="d-flex" navbar>
            <MenuAccount type={"admin"} />
          </Nav>
        ) : Role === "partner" ? (
          <Nav className="d-flex" navbar>
            <MenuAccount type={"partner"} />
          </Nav>
        ) : (
          <Nav className="d-flex" navbar>
            <MenuWishlist />
            <MenuCart />
            <MenuAccount />
          </Nav>
        )}
      </Navbar>
    </header>
  );
};

export default Menu;

// const [slide, setSlide] = useState(0);
// const [lastScrollY, setLastScrollY] = useState(0);
// // const [background, setBackground] = useState("");

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// });

// const handleScroll = () => {
//   const currentScrollY = window.scrollY;

//   if (currentScrollY <= 7) {
//     // setBackground("transparent");
//   } else if (currentScrollY > lastScrollY) {
//     setSlide("-75px");
//   } else {
//     setSlide(0);
//     // setBackground("rgba(0,0,0,.9)");
//   }

//   return setLastScrollY(currentScrollY);
// };

// style={{ transform: `translate(0, ${slide})`, transition: 'transform 150ms linear' }}
