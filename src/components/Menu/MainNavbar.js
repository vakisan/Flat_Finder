import React, { useState } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
  Row,
  Col,
} from "reactstrap";

class MainNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }

render(){

  return (
    <header className="header-global">
      <Navbar
        expand="md"
        className="navbar navbar-pre navbar-light navbar-expand-lg nav-custom headroom" id="navbar-main">
        <Container>
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            FlatFinder
          </NavbarBrand>
            <Nav className=" align-items-lg-center" navbar>
              <NavItem>
                <NavLink href="#login" className="nav-link-custom">
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#login" className="nav-link-custom">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/Listing" tag={Link} className="nav-link-custom">
                  Listing
                </NavLink>
              </NavItem>
            </Nav>
        </Container>
      </Navbar>
    </header>
  );
};
}

export default MainNavbar;
