import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from "reactstrap";
import { FaRegUser } from "react-icons/fa";
import Swal from "sweetalert2";

const MenuAccount = props => {
  const { type } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const openLogin = () => dispatch({ type: "MODAL_LOGIN", payload: true });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!"
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: "Logging out!",
          timer: 1000,
          allowOutsideClick: false,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        })
          .then(result => {
            if (result.dismiss === Swal.DismissReason.timer) return <Redirect to={"/"} />;
          })
          .then(() => {
            Swal.fire({
              title: "Logged out",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              localStorage.removeItem("userID");
              localStorage.removeItem("token");
              dispatch({ type: "LOGOUT_SUCCESS" });
            });
          });
      }
    });
  };

  const renderPartner = () => {
    return (
      <Dropdown
        className="navbar__account"
        onMouseEnter={() => setDropdownOpen(true)}
        onFocus={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle nav className="dropdown__title">
          <FaRegUser /> Partner
        </DropdownToggle>
        <DropdownMenu right className="dropdown__menu">
          <DropdownItem>
            <NavLink href="/partner">Partner Profile</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink onClick={handleLogout}>Sign Out</NavLink>
          </DropdownItem>
          {/* <div className="row">
            <div className="dropdown__menu__container"></div>
          </div> */}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const renderAdmin = () => {
    return (
      <Dropdown
        className="navbar__account"
        onMouseEnter={() => setDropdownOpen(true)}
        onFocus={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle nav className="dropdown__title mx-3">
          <FaRegUser /> Admin
        </DropdownToggle>
        <DropdownMenu right className="dropdown__menu">
          <DropdownItem>
            <NavLink href="/manage/user">Manage User</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/manage/partner">Manage Partner</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink onClick={handleLogout}>Sign Out</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const renderUser = () => {
    return (
      <Dropdown
        className="navbar__account"
        onMouseEnter={() => setDropdownOpen(true)}
        onFocus={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle nav className="dropdown__title">
          <FaRegUser />
        </DropdownToggle>
        <DropdownMenu right className="dropdown__menu">
          <DropdownItem>
            <NavLink onClick={openLogin}>Sign In</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/register">Sign Up</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/user">User Profile</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/partner">Partner Profile</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink onClick={handleLogout}>Sign Out</NavLink>
          </DropdownItem>
          {/* <div className="row">
            <div className="dropdown__menu__container"></div>
          </div> */}
        </DropdownMenu>
      </Dropdown>
    );
  };

  switch (type) {
    case "admin":
      return renderAdmin();
    case "partner":
      return renderPartner();
    default:
      return renderUser();
  }
};

export default MenuAccount;
