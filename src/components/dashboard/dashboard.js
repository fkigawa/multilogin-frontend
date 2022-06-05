/*
Dashboard component. Leads to different features.
*/
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QueryString from "query-string";
import Cookies from "js-cookie";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    token: "",
    user: {},
  };

  async componentDidMount() {
    const key = QueryString.parse(this.props.location.search)._id;
    const valueCheck = !(Cookies.get(key) === null);
    const value = valueCheck ? Cookies.get(key) : "";
    console.log("userToken", value);
    let result = await axios.get(
      "http://localhost:8000/api/auth/users/current",
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Token " + value,
        },
        credentials: "include",
      }
    );
    if (result.status == 200) {
      this.setState({
        user: result.data.user,
      });
    } else {
      this.setState({
        user: this.props?.user,
      });
    }

    console.log(this.state.user);
  }

  onLogout = () => {
    Cookies.remove(this.state.user._id);
    this.props.history.replace("");
  };

  render() {
    return (
      this.state.user.token ? this.state.user.token : this.props.user.token
    ) ? (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <div to="/">
                  {this.state?.user?.email?.toString()
                    ? this.state?.user?.email?.toString()
                    : this.props?.user?.email?.toString()}
                </div>
              </li>
            </ul>
          </nav>

          <input type="submit" value="Logout" onClick={this.onLogout} />
        </div>
      </Router>
    ) : (
      <div>
        <h1>Unauthorized access</h1>
        <p>You have to login to access the dashboard</p>
        <p>
          <Link to="/">Login!</Link>
        </p>
      </div>
    );
  }
}

export default Dashboard;
