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

class App extends Component {

  state = {
    token: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  /*
  Checks to see if token is present for persistence purposes.
  */
  async componentDidMount () {
    const token = !(localStorage.getItem('token') === null);
    const userToken = token ? localStorage.getItem('token') : '';

    let result = await axios.get('http://localhost:8000/api/auth/users/current', {
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Token " + userToken
      },
      credentials: "include",
    });

    if (result.status == 200) {
      this.props.history.push("dashboard");
      this.setState({ token: userToken });
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
    localStorage.removeItem('token');
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
    .then((resp) => {
      if (resp.data.success) {
        this.props.history.push("dashboard");
        localStorage.setItem('token', resp.data.userId);
        this.setState({
          token: resp.data.userId
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
      .then((resp) => {
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
        <Route exact path="/dashboard" render={routeProps => <Dashboard {...routeProps}  token={this.state.token} onLogout={this.onLogout} />}/>
        <Route exact path="/register" render={routeProps => <Register {...routeProps} handleChange={this.handleChange} handleRegister={this.handleRegister} onCancelClick={this.onCancelClick} />}/>
      </Switch>
    );
  }
}

// <div className="App">
// {this.state.login ? <Login handleChange={this.handleChange} handleLogin={this.handleLogin} onRegisterClick={this.onRegisterClick} /> : null}
// {this.state.register ? <Register handleChange={this.handleChange} handleRegister={this.handleRegister} /> : null}
// {this.state.loggedIn ? <Dashboard userId={this.state.userId} /> : null}
// </div>

export default withRouter(App);
