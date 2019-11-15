import React, { Component } from 'react';

// import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      responseToLogin: '',
    };
  }


  componentDidMount() {
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log('here', this.state.email, this.state.password)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }),
    });
    const body = await response.json();
    console.log(body.resp)

    this.setState({ responseToLogin: body.resp });
  };

render() {
    return (

      <div id="wrapper">
      <div id="box">
        <div id="top_header">
          <h3>Company Processor</h3>
          <h5>
            Sign in to continue to your<br />
            dashboard
          </h5>
        </div>
        <div id="inputs">
            <form onSubmit={this.handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <input type="submit" value="Sign in"/>
            </form>
        </div>
        <div id="bottom">
          <a href="#">Create an account</a>
          <a className="right_a" href="#">Forgot password?</a>
        </div>
      </div>
      </div>

    );
  }
}

export default Login;
