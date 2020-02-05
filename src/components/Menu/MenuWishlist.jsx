import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";

const MenuWishlist = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="navbar__wishlist" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle nav className="dropdown__title">
        <FaRegHeart />
      </DropdownToggle>
      <DropdownMenu right className="dropdown__menu">
        <div className="row">
          <div className="dropdown__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuWishlist;
