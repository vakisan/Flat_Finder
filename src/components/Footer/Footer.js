import React from "react";
import { Container,Row, Col } from "reactstrap";

const Footer = (props) => {
  return (
    <footer className="footer-custom">
      <Container>
        <div className="mb-5">
        </div>
        <hr />
        <div className="mt-2 bold">
          © Group 32
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
