import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import MainNavbar from "../components/Menu/MainNavbar";
import Footer from "../components/Footer/Footer";
import {
  EstateAgent,
  FDMEmployeeAdvertiser,
  PrivateAdvertiser,
  Seeker,
} from "../User";
import { auth } from "../Init";

class Register extends React.Component {
  state = {};

  async registerNewUser() {
    function resetForm() {
      document.getElementById("EmailInput").value = null;
      document.getElementById("PasswordInput").value = null;
      document.getElementById("UsernameInput").value = null;
      document.getElementById("TelephoneInput").value = null;
      document.getElementById("FirstNameInput").value = null;
      document.getElementById("LastNameInput").value = null;
    }
    if (auth.currentUser==null) {
      let newUser = null;
      if (document.getElementById("Seeker").checked) {
        newUser = new Seeker(
          document.getElementById("EmailInput").value,
          document.getElementById("PasswordInput").value,
          document.getElementById("UsernameInput").value,
          document.getElementById("TelephoneInput").value,
          document.getElementById("FirstNameInput").value,
          document.getElementById("LastNameInput").value
        );
      } else if (document.getElementById("Estate").checked) {
        newUser = new EstateAgent(
          document.getElementById("EmailInput").value,
          document.getElementById("PasswordInput").value,
          document.getElementById("UsernameInput").value,
          document.getElementById("TelephoneInput").value,
          document.getElementById("FirstNameInput").value,
          document.getElementById("LastNameInput").value
        );
      } else if (document.getElementById("Private").checked) {
        newUser = new PrivateAdvertiser(
          document.getElementById("EmailInput").value,
          document.getElementById("PasswordInput").value,
          document.getElementById("UsernameInput").value,
          document.getElementById("TelephoneInput").value,
          document.getElementById("FirstNameInput").value,
          document.getElementById("LastNameInput").value
        );
      } else if (document.getElementById("FDMer").checked) {
        newUser = new FDMEmployeeAdvertiser(
          document.getElementById("EmailInput").value,
          document.getElementById("PasswordInput").value,
          document.getElementById("UsernameInput").value,
          document.getElementById("TelephoneInput").value,
          document.getElementById("FirstNameInput").value,
          document.getElementById("LastNameInput").value
        );
      } else {
        console.log("error");
      }
      console.log(1)
      //resetForm();
      return newUser.Register();
    } else {
      alert("You have already registered");
    }
  }

  render() {
    return (
      <>

        <Card body className="shadow-lg border-0 gradient-landing-box">
          <div className="p-5">
            <Row className="text-center">
              <Col lg="12" className="text-center">
                <Form>
                  <FormGroup>
                    <Label for="UsernameInput" hidden>
                      Email
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      id="UsernameInput"
                      placeholder="Username"
                    />
                  </FormGroup>{" "}
                  <FormGroup>
                    <Label for="FirstNameInput" hidden>
                      First Name
                    </Label>
                    <Input
                      type="text"
                      name="firstname"
                      id="FirstNameInput"
                      placeholder="First Name"
                    />
                  </FormGroup>{" "}
                  <FormGroup>
                    <Label for="LastNameInput" hidden>
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      name="lastname"
                      id="LastNameInput"
                      placeholder="Last Name"
                    />
                  </FormGroup>{" "}
                  <FormGroup>
                    <Label for="EmailInput" hidden>
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="EmailInput"
                      placeholder="Email"
                    />
                  </FormGroup>{" "}
                  <FormGroup>
                    <Label for="TelephoneInput" hidden>
                      Last Name
                    </Label>
                    <Input
                      type="tel"
                      name="telephone"
                      id="TelephoneInput"
                      placeholder="Telephone"
                    />
                  </FormGroup>{" "}
                  <FormGroup>
                    <Label for="PasswordInput" hidden>
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="PasswordInput"
                      placeholder="Password"
                    />
                  </FormGroup>{" "}
                  <div class="form-inline justify-content-center">
                  <Input
                    type="radio"
                    id="Seeker"
                    name="register"
                    value="Seeker"
                    form="register"
                    defaultChecked
                  />
                  <Label for="Seeker" className="mr-2 text-uppercase">Employee</Label>
                  <br></br>
                  <Input
                    type="radio"
                    id="Private"
                    name="register"
                    value="Private"
                    form="register"
                  />
                  <Label for="Private" className="mr-2 text-uppercase">
                    Private Advertiser
                  </Label>
                  <br></br>
                  <Input
                    type="radio"
                    id="Estate"
                    name="register"
                    value="Estate"
                    form="register"
                  />
                  <Label for="Estate" className="mr-2 text-uppercase">Estate Agent</Label>
                  <br></br>
                  </div>
                  <br></br>
                  <Button
                    className="login btn-lg"
                    onClick={this.registerNewUser}
                  >
                    Signup
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Card>
      </>
    );
  }
}

export default Register;
