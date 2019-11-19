/*
Dashboard component. Leads to different features.
*/
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Dashboard extends React.Component {

   render() {
     return this.props.user.token ?
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            <input type="submit" value="Logout" onClick={this.props.onLogout}/>
          </div>
        </Router>
        :

        <div>
  				<h1>Unauthorized access</h1>
  				<p>You have to login to access the dashboard</p>
  				<p><Link to="/">Login!</Link></p>
			  </div>
   }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default Dashboard;
