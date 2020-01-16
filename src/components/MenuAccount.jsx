import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FaRegUser } from "react-icons/fa";

const MenuAccount = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="navbar__account" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="dropdown__title">
        <FaRegUser />
      </DropdownToggle>
      <DropdownMenu className="dropdown__menu">
        <div className="row">
          <div className="dropdown__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuAccount;
