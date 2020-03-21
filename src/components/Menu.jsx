/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useState /* useEffect */ } from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaPhone, FaEnvelope, FaGithub, FaRegUser } from "react-icons/fa";
import { CHANGE_MODAL_ACTIVE_TAB, MODAL_AUTH, LOGOUT } from "../support/types";
import { Redirect } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.id);
  const Username = useSelector(({ User }) => User.username);
  const Name = useSelector(({ User }) => User.name);
  const Role = useSelector(({ User }) => User.role);

  const Logo =
    "data:image/png;base64,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";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const openLogin = () => {
    dispatch({ type: CHANGE_MODAL_ACTIVE_TAB, payload: "1" });
    dispatch({ type: MODAL_AUTH, payload: true });
  };
  const openRegister = () => {
    dispatch({ type: CHANGE_MODAL_ACTIVE_TAB, payload: "2" });
    dispatch({ type: MODAL_AUTH, payload: true });
  };

  const handleLogout = () => {
    Swal.fire({
      toast: true,
      title: "Logout?",
      icon: "warning",
      position: "top-end",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        Swal.fire({
          toast: true,
          title: "Logging out!",
          position: "top-end",
          timer: 2000,
          icon: "success",
          showConfirmButton: false,
          onClose: () => {
            localStorage.removeItem("token");
            dispatch({ type: LOGOUT });
          },
          onAfterClose: () => {
            window.location.reload(true);
            return <Redirect to="/" />;
          }
        });
      }
    });
  };

  return (
    <header className="header-menu ">
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
        <Nav navbar>
          <NavItem>
            <NavLink href="https://github.com/smartoryu/idecorate">
              <span style={{ fontSize: 13 }}>
                <FaGithub />
                &nbsp;Github UI
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/smartoryu/idecorate-api">
              <span style={{ fontSize: 13 }}>
                <FaGithub />
                &nbsp;Github API
              </span>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>

      {/**
       *
       * ============================= NAVBAR =============================
       *
       */}
      <Navbar className="navbar__container" light expand="md">
        <Nav navbar>
          <div className="d-flex">
            <NavbarBrand href="/" style={{ display: "block", width: "100px" }}>
              <img className="my-auto" style={{ width: "100%" }} src={Logo} alt="logo" />
            </NavbarBrand>
            <MenuDropdown />
          </div>
        </Nav>
        <Nav className="mx-auto" navbar>
          <div className="search__container">
            <input type="search" className="search__input mx-2" placeholder="Search" />
          </div>
        </Nav>
        <Nav className="d-flex" navbar>
          <Dropdown
            className="navbar__account"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
            toggle={() => setDropdownOpen(true)}
            isOpen={dropdownOpen}>
            <DropdownToggle>
              <FaRegUser />
              <span style={{ fontSize: 15, marginLeft: 5 }}>Hi, {Name}!</span>
            </DropdownToggle>
            <DropdownMenu right className="dropdown__menu m-0">
              {Role === "admin" ? (
                <>
                  <DropdownItem>
                    <NavLink href="/admin">Dashboard</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={handleLogout}>Sign Out</NavLink>
                  </DropdownItem>
                </>
              ) : Role === "partner" ? (
                <>
                  <DropdownItem>
                    <NavLink href={`/p/${userId}/${Username}/profile`}>Account Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={`/p/${userId}/${Username}/store`}>Store Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={handleLogout}>Sign Out</NavLink>
                  </DropdownItem>
                </>
              ) : Role === "member" ? (
                <>
                  <DropdownItem>
                    <NavLink href={`/m/${userId}/${Username}/profile`}>User Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={`/m/${userId}/${Username}/wishlist`}>Wishlist</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={handleLogout}>Sign Out</NavLink>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem>
                    <NavLink onClick={openLogin}>Sign In</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink onClick={openRegister}>Sign Up</NavLink>
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    </header>
  );
};

const MenuDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Dropdown
      className="navbar__dropdown my-auto"
      onMouseEnter={() => setDropdownOpen(true)}
      onFocus={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      isOpen={dropdownOpen}>
      <DropdownToggle>
        <span>Categories</span>
      </DropdownToggle>
      <DropdownMenu right={false} className="dropdown__menu m-0">
        <div className="row">
          <div className="dropdown__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Menu;
