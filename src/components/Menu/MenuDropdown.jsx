import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const MenuDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown
      className="navbar__dropdown my-auto"
      onMouseEnter={() => setDropdownOpen(true)}
      onFocus={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      isOpen={dropdownOpen}
      // toggle={toggle}
    >
      <DropdownToggle>
        <span>Categories</span>
      </DropdownToggle>
      {/* <button className="btn btn-secondary dropdown__title">
      </button> */}
      <DropdownMenu right className="dropdown__menu">
        <div className="row">
          <div className="dropdown__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropdown;
