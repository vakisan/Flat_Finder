import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/scss/info.scss";
import "./assets/css/index.css";

import Index from "./front/App";
import Register from "./front/Register";
import Listing from "./front/Listing";
import Messages from "./front/Messages";
import Init from "./Init";
import User from "./User";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <Index {...props} />} />
      <Route
        path="/Register"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route path="/Listing" exact render={(props) => <Listing {...props} />} />
      <Route path="/Messages" exact render={(props) => <Messages {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
