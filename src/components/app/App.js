/*
App component. All interfaces are initialized here.
*/
import React, { Component } from "react";
import Login from "../login/login.js";
import Register from "../login/register.js";
import Dashboard from "../dashboard/dashboard.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Cookies from "js-cookie";

class App extends Component {
  state = {
    token: "",
    email: "",
    password: "",
    confirmPassword: "",
    user: {},
  };

  /*
  Checks to see if token is present for persistence purposes.
  */
  async componentDidMount() {}

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCancelClick = () => {
    this.props.history.replace("");
  };

  onRegisterClick = () => {
    this.props.history.push("register");
  };

  // Needed to be moved to dashboard.js directly, because of difference in state
  // onLogout = () => {
  //   Cookies.remove(this.state.user._id);
  //   this.props.history.replace("");
  // };

  /*
  Handler takes email and password, makes an axios post request to the server to authentication user in the database.
  Redirects user to dashboard page if successful.
  */
  handleLogin = async (event) => {
    await axios
      .post("http://localhost:8000/api/auth/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then((res) => {
        if (res.data.auth == "success") {
          this.props.history.push({
            pathname: "/dashboard",
            search: `?_id=${res.data.user._id}`,
            state: { user: res.data.user },
          });
          Cookies.set(res.data.user._id, res.data.user.token, { expires: 1 });
          this.setState({
            user: res.data.user,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*
  Handler takes email and password, makes an axios post request to the server to create a new user in the database.
  Redirects user back to login page.
  */
  handleRegister = async (event) => {
    let user = this.state.email;
    let pass = this.state.password;
    if (pass === this.state.confirmPassword) {
      await axios
        .post("http://localhost:8000/api/auth/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          user: {
            email: this.state.email,
            password: this.state.password,
          },
        })
        .then((res) => {
          this.props.history.replace("");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  /*
    When the App component is rendered, depending on the path of the url, different Child components will be rendered.
  */
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Login
              {...routeProps}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin}
              onRegisterClick={this.onRegisterClick}
            />
          )}
        />
        <Route
          path="/dashboard"
          render={(routeProps) => (
            <Dashboard
              {...routeProps}
              // ideally would have the user be globally declared and updated
              // user={this.state.user}
              // onLogout={this.onLogout}
            />
          )}
        />
        <Route
          exact
          path="/register"
          render={(routeProps) => (
            <Register
              {...routeProps}
              handleChange={this.handleChange}
              handleRegister={this.handleRegister}
              onCancelClick={this.onCancelClick}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
