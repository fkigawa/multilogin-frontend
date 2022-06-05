/*
Dashboard component. Leads to different features.
*/
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import QueryString from "query-string";
import Cookies from "js-cookie";
import Axios from "axios";

class Dashboard extends React.Component {
  state = {
    user: this.props.location.state.user,
    dummyData: "",
  };

  async componentDidMount() {
    const key = QueryString.parse(this.props.location.search)._id;
    const valueCheck = !(Cookies.get(key) === null);
    const value = valueCheck ? Cookies.get(key) : "";
    if (value) {
      let result = await Axios.get(
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
      }
    }
  }

  onLogout = () => {
    Cookies.remove(this.state.user._id);
    this.props.history.replace("");
  };

  fetchDummyData = async (e) => {
    const userId = this.state.user._id;

    const payload = {
      User: {
        _id: userId,
      },
    };

    await Axios.post(
      "http://localhost:8000/api/books/books/getBooks",
      { payload: payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }
    ).then(async (resp) => {
      if (resp.data.success) {
        this.setState({
          dummyData:
            resp.data.query[0].title +
            ", " +
            resp.data.query[0].numberOfPages +
            " pages, published in " +
            resp.data.query[0].yearOfPublishing,
        });
      } else {
        console.log("Failed in router call.");
      }
    });
  };

  render() {
    return this.state.user.token ? (
      <Router>
        <div>
          <ul>
            <div>User: {this.state.user.email.toString()}</div>
          </ul>
          <ul>
            <div>Dummy Data: {this.state.dummyData.toString()}</div>
          </ul>
          <ul>
            <input
              type="submit"
              value="Fetch Dummy Data"
              onClick={this.fetchDummyData}
            />
          </ul>
          <ul>
            <input type="submit" value="Logout" onClick={this.onLogout} />
          </ul>
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
