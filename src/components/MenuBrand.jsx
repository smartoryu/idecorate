import React, { useState } from "react";
import { Dropdown, DropdownToggle } from "reactstrap";

const MenuDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="navbar_dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="dropdown__title">iDecorate</DropdownToggle>
    </Dropdown>
  );
};

export default MenuDropdown;
