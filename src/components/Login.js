import React, { Component } from "react";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      register: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
    

  handleLogin = e => {
    e.preventDefault();
    this.props.handleLogin(this.state);
  };

  handleToggle = () => {
    this.setState({ register: this.refs.register_check.checked });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="center">Locations</h1>
        </div>
        <form onSubmit={this.handleLogin}>
          <div className="row">
            <div className="col s4 input-field offset-s4">
              <input
                id="email"
                className="validate active"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label data-error="wrong" data-success="right" htmlFor="email">
                Email
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col s4 input-field offset-s4">
              <input
                id="password"
                className="validate purple-text active"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="center">
              <div>
                <input
                  id="register"
                  type="checkbox"
                  className="filled-in"
                  ref="register_check"
                  checked={this.state.register}
                  onChange={() => this.handleToggle()}
                />
                <label htmlFor="register">
                  <span>Check to register</span>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="center-align">
              <div className="center">
                <input
                  className={"waves-effect waves-light btn"}
                  value={this.state.register ? "Register" : "Login"}
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
