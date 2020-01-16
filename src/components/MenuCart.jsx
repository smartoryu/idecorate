import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FiShoppingCart } from "react-icons/fi";

const MenuCart = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="navbar__cart" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="navbar__title">
        <FiShoppingCart />
      </DropdownToggle>
      <DropdownMenu className="navbar__menu">
        <div className="row">
          <div className="navbar__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuCart;
