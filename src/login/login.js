import React, { Component } from "react";
import "./login.css";
import { HOSTNAME, SERVERPORT } from "../global";
import { Link } from "react-router";
import { browserHistory } from "react-router";
import { AuthenticationContext, AlreadyAuthCheck } from "../authentication";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      nameError: "",
      passwordError: "",
      loginError: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  validate = () => {
    let nameError = "";
    let passwordError = "";

    if (!this.state.username) {
      nameError = "Mandatory field";
    }

    if (!this.state.password) {
      passwordError = "Mandatory field";
    }

    if (passwordError || nameError) {
      this.setState({ passwordError, nameError });
      return false;
    }
    return true;
  };

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      fetch("http://" + HOSTNAME + SERVERPORT + "/api/creds", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(res => {
          return res.json();
        })
        .then(msg => {
          if (msg.success === true) {
            if (msg.result === true) {
              this.setState({ loginError: "" });
              this.props.Authenticate();
              this.props.setAuthenticatedName(this.state.username);
              browserHistory.push("/dashboard");
            } else {
              this.setState({ loginError: "Wrong username or password." });
            }
          } else {
            this.setState({ loginError: "An error occurred: " + msg.error });
          }
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Username:
        <br />
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <div style={{ fontSize: 14, color: "#d80000" }}>
          {this.state.nameError}
        </div>
        <br />
        Password:
        <br />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <div style={{ fontSize: 14, color: "#d80000" }}>
          {this.state.passwordError}
        </div>
        <div style={{ fontSize: 14, color: "#d80000" }}>
          {this.state.loginError}
        </div>
        <br />
        <input id="sign_in" type="submit" value="Sign In" />
        <br />
        <br />
        <div className="page-newAccountArea">
          <p>
            <Link to="/newaccount">Create New Account</Link>
          </p>
        </div>
        <p>It's free and it always will be.</p>
      </form>
    );
  }
}

export default class Login extends Component {
  render() {
    return (
      <div id="login_page" className="page-login">
        <div id="login_form">
          <p id="login_header">Login</p>
          <br />
          <AuthenticationContext.Consumer>
            {({
              isAuthenticated,
              AuthenticatedName,
              Authenticate,
              unAuthenticate,
              setAuthenticatedName
            }) => (
              <span>
                <AlreadyAuthCheck isAuthenticated={isAuthenticated} />
                <LoginForm
                  Authenticate={Authenticate}
                  setAuthenticatedName={setAuthenticatedName}
                />
              </span>
            )}
          </AuthenticationContext.Consumer>
        </div>
      </div>
    );
  }
}
