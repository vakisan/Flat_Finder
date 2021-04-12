import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";

import Navbar from "../components/Menu/MainNavbar";
import Landing from "./Landing";

function App() {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  );
}

export default App;
