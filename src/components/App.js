import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import Dashboard from "./Dashboard";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: false,
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        console.log("response from checkLoginStatus: ", response)
          return response
      })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === false
        ) { console.log("condition 1")
          this.setState({
            loggedInStatus: true,
            user: response.data.user
          })
          console.log("condition state: ", this.state)
          
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === true)
        ) { console.log("condition 2")
          this.setState({
            loggedInStatus: false,
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  };

  componentDidMount() {
    this.checkLoginStatus();
  };

  handleLogout() {
    this.setState({
      loggedInStatus: false,
      user: {}
    });
  };

  handleLogin(data) {
    this.setState({
      loggedInStatus: true,
      user: data.user
    });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  checkLoginStatus={this.checkLoginStatus}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  checkLoginStatus={this.checkLoginStatus}
                  loggedInStatus={this.state.loggedInStatus}
                  email={this.state.user.email}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}