import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User } from './../../User'

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
import { auth } from "../../Init";

const MainNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  console.log(window._globalUserData_)
  return (
    <header className="header-global">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="mr-lg-5 navbar-brand-post" to="/" tag={Link}>
            FlatFinder
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
          </Collapse>
          <Nav className="align-items-lg-center" navbar>
              <NavItem>
                <NavLink to="/Listing" tag={Link} onClick={new User().Logout}>
                  {auth.currentUser?("Logout "+auth.currentUser.email):window.location.href = "./src/front/Login"}
                </NavLink>
              </NavItem>
              </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainNavbar;
