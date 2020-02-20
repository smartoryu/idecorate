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
      // toggle={toggle}
      isOpen={dropdownOpen}>
      <DropdownToggle>
        <span>Categories</span>
      </DropdownToggle>
      {/* <button className="btn btn-secondary dropdown__title">
      </button> */}
      <DropdownMenu right={false} className="dropdown__menu m-0">
        <div className="row">
          <div className="dropdown__menu__container"></div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropdown;
