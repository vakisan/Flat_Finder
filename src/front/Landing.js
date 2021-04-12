import React, { useState } from 'react';
import Login from "./Login";
import Register from "./Register";
import Footer from "../components/Footer/Footer";
import AdvertiseListingShot from './../front/sections/AdvertiseListing.jpeg'
import MessageShot from './sections/Message.jpeg'

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
  TabContent, TabPane, Nav, NavItem, NavLink,
} from "reactstrap";
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPlug,
  faSearchLocation,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

const Landing = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <>
      <main>
        <div>
          <section className="section section-shaped">
            <div className="shape shape-style-1 shape-default">
              <Container className="landing-container d-flex align-items-center">
                <div className="col px-0">
                  <Row>
                    <Col className="text-center" lg="6">
                    <Card className="gradient-landing-ad shadow-lg p-3 border-0 card_hover1">
                        <div className="p-5">
                              <h3>Are you an FDM Employee looking for accomodation?</h3>
                              <p className="mt-3">
                                Sign up today to find exclusive accomodation that are available to you as an FDM exmployee.
                              </p>
                              <a href="#login" target="_parent">
                              <Button className="register btn btn-lg btn-block">
                                Join as an Employee!
                              </Button>
                              </a>
                        </div>
                      </Card>
                    </Col>
                    <Col className="text-center" lg="6">
                      <Card className="gradient-landing shadow-lg p-3 border-0 card_hover2">
                        <div className="p-5">
                              <h3>Are you looking to advertise your property?</h3>
                              <p className="mt-3">
                                List as many properties as you like and easily communicate with potential tenants today.
                              </p>
                              <a href="#login" target="_parent">
                              <Button className="register btn btn-lg btn-block">
                                Join as an advertiser!
                              </Button>
                              </a>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
          </section>
        </div>
        <div class="parallax">
          <Screenshot message="As a user of the system you can advertise properties" 
          scrollDistance="500" gridLoc="1_1" src={AdvertiseListingShot}></Screenshot>
          <Screenshot message="Instantly Message regarding listings" 
          scrollDistance="500" gridLoc="2_2" src={MessageShot}></Screenshot>

        </div>
        <section className="section section-login" id="login">
          <Container>
            <Row>
              <Col md="8"  className="mx-auto">
                <Nav tabs>
                  <NavItem className="mx-auto">
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      <h2>Login</h2>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mx-auto">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      <h2>register</h2>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} class>
                  <TabPane tabId="1" className="show">
                    <Login />
                  </TabPane>
                  <TabPane tabId="2">
                    <Register/>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section section-feedback pb-0">
          <Container>
            <div className="m-auto pt-1">
              <blockquote class="blockquote text-center">
                <p class="mb-0 feedback">
                  Looking for accomdation at short notice has never been any
                  easier for me. This feature has helped me relocate for my job
                  quickly and easily.
                </p>
                <footer class="blockquote-footer feedback-name">
                  John
                  <br />
                  <img
                    class="img-fluid rounded-circle shadow-lg feedback-dp"
                    src="https://st.depositphotos.com/1734074/4228/v/600/depositphotos_42286779-stock-illustration-vector-programmer-icon.jpg"
                  ></img>
                </footer>
              </blockquote>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Landing;


class Screenshot extends React.Component {
  state = {
    isTop: true,
  };

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < this.props.scrollDistance;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
    });
  }
  render() {
    let classname1 = `screenshot${this.props.gridLoc}_text bg-light`
    let classname2 = `screenshot${this.props.gridLoc}_text_bye bg-light`
    console.log(document.getElementsByClassName(classname1)[0], document.getElementsByClassName(classname2)[0])
    if(this.state.isTop){
      return (
        <div style={{ height: '200vh' }}>
          <div style={{ position: 'fixed', top: 0 }} className="grid-container">
            <div>
              <Card className={classname2} body>
              <CardTitle>
            {this.props.message}
            </CardTitle>
            <CardText>
            <img className="screenshot_img" src={this.props.src}></img>
            </CardText>
              </Card>
            </div>
            </div>
        </div>
      );
    }
    else{
      return (
        <div style={{ height: '200vh' }}>
          <div style={{ position: 'fixed', top: 0 }} className="grid-container"> 
          {this.state.isTop ? null :( 
          <Card className={classname1} body>
              <CardTitle>
            {this.props.message}
            </CardTitle>
            <CardText>
            <img className="screenshot_img" src={this.props.src}></img>
            </CardText>
              </Card>
          )
    }
          </div>
        </div>
      );
    }
  }
} 