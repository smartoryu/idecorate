import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FaRegUser } from "react-icons/fa";

export const DropdownHeader = ({ children, className, isOpen, name, onClick, toggle }) => {
  return (
    <Dropdown className={className} onMouseEnter={toggle} onMouseLeave={toggle} isOpen={isOpen} toggle={toggle}>
      <DropdownToggle onClick={onClick} nav>
        <FaRegUser />
        <span style={{ fontSize: 15, marginLeft: 5 }}>Hi, {name}!</span>
      </DropdownToggle>
      <DropdownMenu right className="dropdown__menu m-0">
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};
