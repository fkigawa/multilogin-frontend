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
    userId: '',
    login: true,
    loggedIn: false,
    register: false,
    email: '',
    password: '',
    confirmPassword: '',
    incorrect: false
  }

  async componentDidMount () {
    const token = !(localStorage.getItem('token') === null);
    const userToken = token ? localStorage.getItem('token') : '';
    console.log(userToken)


    let result = await axios.get('http://localhost:8000/api/users/current', {
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Token " + userToken
      },
      credentials: "include",
    });

    if (result.status == 200) {
      this.props.history.push("dashboard");
      this.setState({ userId: userToken });
    }


  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onCancelClick = () => {
    this.props.history.replace("");

    this.setState({
      register: !this.state.register,
      login: !this.state.login
    })
  }

  onRegisterClick = () => {
    this.props.history.push("register");

    this.setState({
      register: !this.state.register,
      login: !this.state.login,
      incorrect: false
    })
  }

  onLogout = () => {
    console.log('here')
    localStorage.removeItem('token');
    this.props.history.replace("");
  }

  handleLogin = async (event) => {
    console.log('in handlelogin', this.state.email, this.state.password)
    await axios.post('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      user: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then( (resp) => {
      if (resp.data.success) {
        this.props.history.push("dashboard");
        console.log('after history')
        localStorage.setItem('token', resp.data.userId);
        this.setState({
          userId: resp.data.userId,
          login: false,
          register: false,
          loggedIn: true,
          incorrect: false
        })
      }
      else {
        this.setState({
          incorrect: true
        })
        console.log('error');
      }
    })
    .catch(function (error) {
      console.log(error);
    })

    console.log('after after history', this.state.userId)
  };

  handleRegister = async (event) => {
    console.log('in handle register', this.state.email, this.state.password)
    let user = this.state.email;
    let pass = this.state.password;
    if(pass === this.state.confirmPassword) {
      await axios.post('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then( resp => {
        this.props.history.replace("");
        this.setState({
          loggedIn: true,
          register: false,
          login: false
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }


  render() {
    return (

      <Switch>
        <Route exact path='/' render={routeProps => <Login {...routeProps} incorrect={this.state.incorrect} handleChange={this.handleChange} handleLogin={this.handleLogin} onRegisterClick={this.onRegisterClick} />}/>
        <Route exact path="/dashboard" render={routeProps => <Dashboard {...routeProps}  userId={this.state.userId} onLogout={this.onLogout} />}/>
        <Route exact path="/register" render={routeProps => <Register {...routeProps}  incorrect={this.state.incorrect} handleChange={this.handleChange} handleRegister={this.handleRegister} onCancelClick={this.onCancelClick} />}/>
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
