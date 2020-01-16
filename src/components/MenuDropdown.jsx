import React, { useState } from "react";
import { Dropdown, DropdownMenu } from "reactstrap";

const MenuDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="navbar__dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <button className="btn btn-secondary dropdown__title">
        <span>Categories</span>
      </button>
      <DropdownMenu className="dropdown__menu">
        <div className="row">
          <div className="dropdown__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropdown;
