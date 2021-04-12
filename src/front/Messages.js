import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'

import {
  Card,  CardTitle, CardText,
  CardSubtitle,
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { ChatDatabase } from "../Database";



class Messages extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props)

        this.messageNow = this.messageNow.bind(this)
    }

    messageNow(){
        console.log("messageNow")
        new ChatDatabase().createChat(this.props.data,document.getElementById("messagebox").value)
        this.componentDidMount()
    }

    componentDidMount(){
        let conversation = []
        let convoUI = []
        new ChatDatabase().getMessages(this.props.data).then((res)=>{
            res.forEach((doc)=>{
                conversation.push(doc.data())
            })
            return conversation
        })
        .then(res=>{
            res.forEach(convo=>{
                console.log(String(convo.Time.toDate()))
                convoUI.push(<MessageSelf 
                    to={"To Advertiser"}
                    message={convo.Message}
                    time={String(convo.Time.toDate())}
                    ></MessageSelf>)
            })
            return convoUI
        })
        .then(res=>{
            ReactDOM.render(res,document.getElementById("messagesHistory"))
        })
    }
  
  render() {

    
    return (
      <>
      <main>

          <Container>
                    <div>
                        <div id="messagesHistory">

                        </div>
                        <Form>
                            <FormGroup>
                                <Input type="text" name="message" id="messagebox" placeholder="Send message" />
                            </FormGroup>
                            <div className="d-flex justify-content-center">
                                <Button className="p-2 ml-0">Make Reservation</Button>
                                <Button className="p-2 ml-2" onClick={this.messageNow}>Send Message</Button> 
                            </div> 
                        </Form>
                    </div>

          </Container>

      </main>
      </>
    );
  }
}


class MessageSelf extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class="card chat chat-me">
                        <div class="card-body chat-body">
                            <p>{this.props.to}</p>
                            <p class="card-text">{this.props.message}</p>
                            <em>{this.props.time}</em>
                        </div>
            </div>
        )
    }
}


class MessageRecipient extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class="card chat">
                        <div class="card-body chat-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <em>date</em>
                        </div>
            </div>
        )
    }
}


export default Messages;