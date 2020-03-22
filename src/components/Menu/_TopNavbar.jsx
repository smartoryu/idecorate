import React from "react";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import { FaPhone, FaEnvelope, FaGithub } from "react-icons/fa";

export const TopNavbarMenu = () => {
  return (
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
  );
};
