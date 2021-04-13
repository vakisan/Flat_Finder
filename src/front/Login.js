import userEvent from "@testing-library/user-event";
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardTitle, CardHeader, CardBody, CardText, Row, Col } from "reactstrap";
import { User } from "./../User";

const Login = (props) => {
  function getUserEmail() {
    console.log(1);
    return document.getElementById("email").value;
  }

  function getUserPassword() {
    return document.getElementById("password").value;
  }

  function submit() {
    window._globalUserData_.UserInfo = null;
    if (window._globalUserData_.UserInfo == null) {
      console.log(1);
      new User(getUserEmail(), getUserPassword()).Login();
      resetForm();
      setTimeout(() => {
        return (window.location.href = "./Listing");
      }, 500);
    } else {
      resetForm();
    }
  }

  function resetForm() {
    document.getElementById("password").value = null;
    document.getElementById("email").value = null;
  }

  return (
    <Card body className="shadow-lg border-0 gradient-landing-box">
    <div className="p-5">
      <Row className="text-center">
        <Col lg="12" className="text-center">
          <CardText>
            <Form>
              <FormGroup>
                <Label for="exampleEmail" hidden>
                  Email
                </Label>
                <Input type="email" name="email" id="email" placeholder="Email" />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="examplePassword" hidden>
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>{" "}
            </Form>
          </CardText>
          <Button
            className="login"
            onClick={submit}
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                submit();
              }
            }}
          >
            Login
          </Button>
          </Col>
          </Row>
          </div>
        </Card>
  );
};

export default Login;
