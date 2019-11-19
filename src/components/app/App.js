/*
App component. All interfaces are initialized here.
*/
import React, { Component } from 'react';
import Login from "../login/login.js"
import Register from '../login/register.js';
import Dashboard from '../dashboard/dashboard.js';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Cookies from 'js-cookie';

class App extends Component {

  state = {
    token: '',
    email: '',
    password: '',
    confirmPassword: '',
    user: {}
  }

  /*
  Checks to see if token is present for persistence purposes.
  */
  async componentDidMount () {
    const token = !(Cookies.get('token') === null);
    const userToken = token ? Cookies.get('token') : '';

    let result = await axios.get('http://localhost:8000/api/auth/users/current', {
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Token " + userToken
      },
      credentials: "include",
    });

    if (result.status == 200) {
      this.props.history.push("dashboard");
      this.setState({
        user: result.data.user
      });
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onCancelClick = () => {
    this.props.history.replace("");
  }

  onRegisterClick = () => {
    this.props.history.push("register");
  }

  onLogout = () => {
    Cookies.remove('token');
    this.props.history.replace("");
  }

  /*
  Handler takes email and password, makes an axios post request to the server to authentication user in the database.
  Redirects user to dashboard page if successful.
  */
  handleLogin = async (event) => {
    await axios.post('http://localhost:8000/api/auth/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      user: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then((res) => {
      if (res.data.auth == 'success') {
        this.props.history.push("dashboard");
        Cookies.set('token', res.data.user.token, { expires: 1 });
        this.setState({
          user: res.data.user
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  /*
  Handler takes email and password, makes an axios post request to the server to create a new user in the database.
  Redirects user back to login page.
  */
  handleRegister = async (event) => {
    let user = this.state.email;
    let pass = this.state.password;
    if (pass === this.state.confirmPassword) {
      await axios.post('http://localhost:8000/api/auth/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then((res) => {
        this.props.history.replace("");
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }

  /*
    When the App component is rendered, depending on the path of the url, different Child components will be rendered.
  */
  render() {
    return (
      <Switch>
        <Route exact path='/' render={routeProps => <Login {...routeProps} handleChange={this.handleChange} handleLogin={this.handleLogin} onRegisterClick={this.onRegisterClick} />}/>
        <Route exact path="/dashboard" render={routeProps => <Dashboard {...routeProps}  user={this.state.user} onLogout={this.onLogout} />}/>
        <Route exact path="/register" render={routeProps => <Register {...routeProps} handleChange={this.handleChange} handleRegister={this.handleRegister} onCancelClick={this.onCancelClick} />}/>
      </Switch>
    );
  }
}

export default withRouter(App);
