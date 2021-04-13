import React from "react";
import "./Styles.module.css";
import firebase from 'firebase'
import {auth} from '../Init'
import Messages from './Messages'
import ReactDOM from 'react-dom'
import {Listing as Listing1} from './../Listing'


import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Accordion, Carousel} from "react-bootstrap";
import { Card as Card1 } from "react-bootstrap";

import LoginNavBar from "../components/Menu/LoginNavBar";
import Footer from "../components/Footer/Footer";
import { ChatDatabase, ListingDatabase } from "../Database";
import { render } from "@testing-library/react";

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingsPosts: [],
      userType: null,
      loading: false,
      data: null,
      length: null,
    };

    this.addnewPost = this.addnewPost.bind(this)
  }

  async componentDidMount() {
    var user = auth.currentUser;

    if (user) {
      // User is signed in.
    }
    let result = await new ListingDatabase()
      .fetchListings()
      .then((listings) => {
        let listingList = [];
        listings.forEach((listing) => {
          listingList.push(listing.data());
        });
        console.log("listings retrieved");
        return listingList;
      })
      .then((resolved) => {
        window._globalListingData_ = resolved;
        console.log(window._globalListingData_);
        return true;
      })
      .then((res) =>{
        this.setState({
          userType:null,
          loading: res,
          data: window._globalListingData_,
        })
      }
      )
      .catch((error) => {
        alert(error);
      });
  }

  isAdvertiser(){
    if(this.state.userType){
      if(["PrivateAdvertiser","EstateAgent","ExistingFDMer"].includes(window._globalUserData_.UserInfo.UserType)){
        return true
      }
    }
  }

  addnewPost(){
    this.state.listingsPosts = []
    console.log(this.state.listingsPosts)
    this.setState({
      listingList: this.state.listingsPosts.push(<NewPost></NewPost>)
    })
  }

  componentDidUpdate() {
  }

  render() {
    if (this.state.data !== null) {
      this.state.data.forEach((listing) => {
        this.state.listingsPosts.push(
          <ListingEntry
            descriptionLine1={listing.descriptionLine1}
            descriptionLine2={listing.descriptionLine2}
            price={listing.price}
            title={listing.title}
            furnished={listing}
            accomodationType ={listing.accomodationType}
            shared ={listing.shared}
            seperateBathroomWC={listing.seperateBathroomWC}
            publicTransport={listing.publicTransport}
            bedroomNumber={listing.bedroomNumber}
            postedByUID={listing.postedByUID}
            postedDate={new Date(listing.postedDate).toLocaleDateString()}
            address={listing.address}
            location={listing.location}
            petFriendly={listing.petFriendly}
            availability={listing.availability}
            postedByUsername={listing.postedByUsername}
            postedByExistingFDMer={listing.postedByExistingFDMer}
            paymentFrequency={listing.paymentFrequency}
            latitude={listing.latitude}
            longitude={listing.longitude}
            image1={listing.image1}
            image2={listing.image2}
            image3={listing.image3}
            video={listing.videos}
          ></ListingEntry>
        );
      })
    }
    var user = auth.currentUser;
    let addNewAdvert = (<Card body>
                          <CardTitle tag="h5">Advertise</CardTitle>
                          <Button onClick={this.addnewPost}>Add New Listing</Button>
                        </Card>)
    if (user) {
      return (
        <>
          <LoginNavBar />
          <main>
            <section className="section pb-0 mb-5">
              <Container>
                <Row>
                  <Col md="4">
                    <Card body>
                      <CardTitle tag="h5">Search</CardTitle>
                      <CardText>
                        <Form>
                          <FormGroup>
                            <Input
                              type="text"
                              name="search"
                              id="search"
                              placeholder="Search location"
                            />
                          </FormGroup>
                        </Form>
                      </CardText>
                      <Button>Search</Button>
                    </Card>
                    {addNewAdvert}
                  </Col>
                  <Col md="8">{this.state.listingsPosts}</Col>
                </Row>
              </Container>
            </section>
          </main>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <LoginNavBar />
          <main>
            <section className="section pb-0 mb-5">
              <Container>
                <Row>
                  <Col md="4">
                    <Card body>
                      <CardTitle tag="h5">Search</CardTitle>
                      <CardText>
                        <Form>
                          <FormGroup>
                            <Input
                              type="text"
                              name="search"
                              id="search"
                              placeholder="Search location"
                            />
                          </FormGroup>
                        </Form>
                      </CardText>
                      <Button>Search</Button>
                    </Card>
                  </Col>
                  <Col md="8">
                    <div class="text-center">
                      <div
                        class="spinner-grow spinner-grow-sm text-info first"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                      <div
                        class="spinner-grow spinner-grow-sm text-warning second"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                      <div
                        class="spinner-grow spinner-grow-sm text-danger third"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <Footer />
        </>
      );
    }
  }
}

class ListingEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card body>
        <div class="d-flex">
          <div class="mr-auto p-2">
            <CardTitle tag="h5">{this.props.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Posted Date: {this.props.postedDate}
            </CardSubtitle>
          </div>
          <div class="p-2">£{this.props.price} per {this.props.paymentFrequency}</div>
        </div>
        <CardText>
          <Row>
            <Col md="4">
              <img
                width="100%"
                src="https://www.thespruce.com/thmb/EvdqR5HNV6Ev9RBv8qGqHNE8DoM=/3636x2045/smart/filters:no_upscale()/how-to-arrange-living-room-furniture-1976578-hero-c99074dcad854b669b91652046a39203.jpg"
                alt="Card image cap"
              />
            </Col>
            <Col md="8">
              <CardTitle class="mb-2">{this.props.descriptionLine1}</CardTitle>
              <hr></hr>
              <CardText>{this.props.descriptionLine2}</CardText>
              </Col>
          </Row>
          <div class="py-3">
            <AdditionalInfo data={this.props}></AdditionalInfo>
          </div>
        </CardText>
      </Card>
    );
  }
}

class AdditionalInfo extends React.Component {


  render() {
    console.log(this.props.data)
    new ChatDatabase().getMessages(this.props.data).then(
      (docs)=>{
        docs.forEach(doc=>{
          console.log(doc.data())
        })
      })

    return (
      <Accordion defaultActiveKey="0">
        
        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="0">
            More Infomation
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card1.Body>
              <ul>
                <li>City: {this.props.data.location}</li>
                <li>Pet Friendly: {this.props.data.petFriendly?"Yes":"No"}</li>
                <li>Availability: {this.props.data.availability?"Yes":"No"}</li>
                <li>Reserved Status: {this.props.data.ReservedStatus?"Yes":"No"}</li>
                <li>Posted By Existing FDM Employee: {this.props.data.postedByExistingFDMer?"Yes":"No"}</li>
              </ul>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>

        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="1">
            Map
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="1">
            <Card1.Body>
              <MapContainer address={this.props.data.address} location={this.props.data.location} lng={this.props.data.longitude}></MapContainer>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>
        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="2">
            Gallery
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="2">
            <Card1.Body>
              <GalleryContainer 
              img1={this.props.data.image1}
              img2={this.props.data.image2}
              img3={this.props.data.image3}
              video={this.props.data.video}
              ></GalleryContainer>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>
        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="3">
            Messages
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="3">
            <Card1.Body>
              <Messages data={this.props.data}></Messages>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>
      </Accordion>
    );
  }
}

export default Listing;

class MapContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      nearbyLocations: null,
      listingNumber:null
    }

  }

  componentDidMount(){
    const fetchVenues = fetch(`https://api.foursquare.com/v2/venues/search?near=${this.props.location}&categoryId=4d4b7104d754a06370d81259&client_id=JPWLJ5WF10AEXQKXR2HOLTFIXYNK5E3BZMUQIUBJX2RFF5XM&client_secret=G5NTD5PCKD3LUJQXILWPQMZDVTRXO5MOYZPV25R3VDD4ADQ3&v=${new Date().getFullYear()+""+('0' + new Date().getMonth()).slice(-2)+""+new Date().getDate()}`)
    .then((res)=>{
      const json = res.json();
      return json
    })
    .then((res)=>{
      this.setState({
        nearbyLocations : res.response.venues
      })
    })
    .then(()=>{
      // this.renderVenues()
    })
  }

  // renderVenues(){
  //   let venueList =[]
  //   this.state.nearbyLocations.forEach((element,i) => {
  //     if(i<5){
  //       venueList.push(element.name)
  //     }
  //   });
  //   const venueListHTML = venueList.map((venue) => 
  //   <div>
  //     <p  className="align-self-center">
  //       {venue}
  //       </p>
  //     </div>)
  //   ReactDOM.render(venueListHTML,document.getElementsByClassName("VenueList5")[0])
  // }
  
  render() {


    const source = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCnxU0-EoXpxOg9mzZMFBuQbhaoKVgFHbI&q=${this.props.address}&zoom=12`
    return (
      <div>
        <iframe
          id="MapId"
      width="550"
      height="350"
      frameborder="0" style={{border:"0"}}
      src={source} allowfullscreen>
    </iframe>
    <div>
      <div className="VenueList5"></div>
    </div>
      </div>
    );
  }
}

class GalleryContainer extends React.Component{

  render(){
    console.log(this.props)
    return(
      <Carousel>
  <Carousel.Item interval={1000}>
    <img
      id="img1"
      className="d-block w-100"
      src={this.props.img1}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
    id="img2"
      className="d-block w-100"
      src={this.props.img2}
      alt={"Second slide"}
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
    id="img3"
      className="d-block w-100"
      src={this.props.img2}
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
  <iframe width="420" height="315" src="https://www.youtube.com/v/A6XUVjK9W4o" frameborder="0" allowfullscreen></iframe>
  </Carousel.Item>
</Carousel>
    )
    
  }
}

class NewPost extends React.Component{
  render() {
    return (
      <Card body>
        <div class="d-flex">
          <div class="mr-auto p-2">
            <CardTitle tag="h5"><Input id="input_title" bsSize="sm" placeholder="Title"></Input></CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              Posted Date: {new Date().toLocaleDateString()}
            </CardSubtitle>
          </div>
          <div class="p-2"><Input id="input_payment" bsSize="sm" placeholder="Payment"></Input> per <Input id="input_frequency" height="10px" bsSize="sm" placeholder="Payment Frequency"></Input></div>
        </div>
        <CardText>
          <Row>
            <Col md="4">
              <img
                width="100%"
                src="https://www.thespruce.com/thmb/EvdqR5HNV6Ev9RBv8qGqHNE8DoM=/3636x2045/smart/filters:no_upscale()/how-to-arrange-living-room-furniture-1976578-hero-c99074dcad854b669b91652046a39203.jpg"
                alt="Card image cap"
              />
            </Col>
            <Col md="8">
              <CardTitle class="mb-2"><Input id="input_short_description" bsSize="sm" placeholder="Short Description"></Input></CardTitle>
              <hr></hr>
              <CardText><Input id="input_full_description" bsSize="sm" placeholder="Full Description"></Input></CardText>
              </Col>
          </Row>
          <div class="py-3">
            <AdditionalNewInfo data={this.props}></AdditionalNewInfo>
          </div>
        </CardText>
      </Card>
    );
  }
}

class AdditionalNewInfo extends React.Component {

  previewImages(){
    console.log(document.getElementById("previewImg1").value)
    console.log(document.getElementById("previewImg2").value)
    console.log(document.getElementById("img1").src)
    document.getElementById("img1").src = document.getElementById("previewImg1").value
    document.getElementById("img2").src = document.getElementById("previewImg2").value
    document.getElementById("img3").src = document.getElementById("previewImg3").value
  }

  previewMap(){
    document.getElementById("MapId").src= `https://www.google.com/maps/embed/v1/place?key=AIzaSyCnxU0-EoXpxOg9mzZMFBuQbhaoKVgFHbI&q=${document.getElementById("previewAddress").value}&zoom=12`
  }

  submitListing(){
    let listingJSON = {
      title:null,
      listingId: null,
      postedDate: null,
      accomodationType:null,
      shared:null,
      seperateBathroomWC:null,
      publicTransport: null,
      bedroomNumber:null,
      postedByUID: null,
      postedByUsername: null,
      address: null,
      descriptionLine1: null,
      descriptionLine2: null,
      description: null,
      postedByExistingFDMer: null,
      location: null,
      image1: null,
      image2:null,
      image3:null,
      videos: null,
      petFriendly: null,
      price: null,
      paymentFrequency : null,
      availability: null,
      reservedStatus: null,
      approvedListing: null,
      latitude:null,
      longitude:null
    };
      listingJSON.title = document.getElementById("input_title").value
      listingJSON.postedDate= new Date().toLocaleDateString()
      listingJSON.accomodationType= document.getElementById('input_accomodation_type').value
      listingJSON.shared= document.getElementById('input_shared').value
      listingJSON.seperateBathroomWC= document.getElementById('input_bathroom_wc').value
      listingJSON.publicTransport= document.getElementById('input_public_transport').value
      listingJSON.bedroomNumber= document.getElementById('input_bedroom').value
      listingJSON.postedByUID= auth.currentUser.uid
      listingJSON.postedByUsername= auth.currentUser.displayName
      listingJSON.address= document.getElementById('previewAddress').value
      listingJSON.descriptionLine1= document.getElementById('input_short_description').value
      listingJSON.descriptionLine2= document.getElementById('input_full_description').value
      //listingJSON.postedByExistingFDMer= (window._globalUserData_.UserInfo.UserType == "ExistingFDMer")?true:false
      listingJSON.location= document.getElementById('input_city').value
      listingJSON.image1= document.getElementById('previewImg1').value
      listingJSON.image2= document.getElementById('previewImg2').value
      listingJSON.image3= document.getElementById('previewImg3').value
      listingJSON.videos= document.getElementById('previewVideo').value
      listingJSON.petFriendly= document.getElementById('input_pet').value
      listingJSON.price= document.getElementById('input_payment').value
      listingJSON.paymentFrequency = document.getElementById('input_frequency').value
      listingJSON.furnished = document.getElementById('input_furnished').value
    
    new ListingDatabase().advertiseListing(listingJSON).then(
      ()=>{
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }
    )

  }


  render() {
    return (
      <Accordion defaultActiveKey="0">
        
        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="0">
            More Infomation
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card1.Body>
              <ul>
                <li>City: <Input id="input_city" bsSize="sm" placeholder="City Name"></Input></li>
                <li>Pet Friendly: <Input id="input_pet" bsSize="sm" placeholder="Select Yes or No"></Input></li>
                <li>Accomodation Type: <Input id="input_accomodation_type" bsSize="sm" placeholder="Accomodation Type"></Input></li>
                <li>Shared Acommodation: <Input id="input_shared" bsSize="sm" placeholder="Shared"></Input></li>
                <li>Seperate Shower/WC: <Input id="input_bathroom_wc" bsSize="sm" placeholder="Separate WC/Shower"></Input></li>
                <li>Public Transport: <Input id="input_public_transport" bsSize="sm" placeholder="Available Public Transport"></Input></li>
                <li>Bedroom Number: <Input id="input_bedroom" bsSize="sm" placeholder="Bedroom Number"></Input></li>
                <li>Furnished: <Input id="input_furnished" bsSize="sm" placeholder="Furnished"></Input></li>
              </ul>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>

        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="1">
            Map
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card1.Body>
              <Input id="previewAddress" bsSize="sm" placeholder="Enter address"></Input>
              <div className="d-flex justify-content-center">
              <Button className="p-2 ml-0 my-2" onClick={this.previewMap}>Preview Map</Button>
              </div>
              <MapContainer address={null} ></MapContainer>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>
        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="2">
            Gallery
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card1.Body>
            <Input id="previewImg1" bsSize="sm" placeholder="Image Link1"></Input>
            <Input id="previewImg2" bsSize="sm" placeholder="Image Link2"></Input>
            <Input id="previewImg3" bsSize="sm" placeholder="Image Link3"></Input>
            <Input id="previewVideo" bsSize="sm" placeholder="Video Link"></Input>
            <div className="d-flex justify-content-center">
              <Button className="p-2 ml-0 my-2" onClick={this.previewImages}>Preview Images</Button>
              </div>
              <GalleryContainer></GalleryContainer>
            </Card1.Body>
          </Accordion.Collapse>
        </Card1>
        <Card1 style={{marginBottom: 0 + 'em'}}>
          <Accordion.Toggle class="btn btn-light" as={Card.Header} eventKey="3">
            Messages
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card1.Body>
              <MessagesExample></MessagesExample>
            </Card1.Body>
          </Accordion.Collapse>
          <Button className="p-2 ml-0" onClick={this.submitListing}>Submit Listing</Button>
        </Card1>
      </Accordion>
    );
  }
}

class MessagesExample extends React.Component {
  state = {};
  
  render() {
      
    return (
      <>
      <main>

          <Container>
                    <div class="card chat">
                        <div class="card-body chat-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <em>date</em>
                        </div>
                    </div>
                    <div class="card chat chat-me">
                        <div class="card-body chat-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <em>date</em>
                        </div>
                    </div>
                    <div>
                        
                        <Form>
                            <FormGroup>
                                <Input type="text" name="message" id="message" placeholder="Send message" />
                            </FormGroup>
                            <div className="d-flex justify-content-center">
                            </div> 
                        </Form>
                    </div>

          </Container>

      </main>
      </>
    );
  }
}