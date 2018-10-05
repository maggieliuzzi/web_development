import React, { Component } from "react";
import "./login.css";
import { Link } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      nameError: "",
      passwordError: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  validate = () => {
    let nameError = "";
    let passwordError = "";

    if (!this.state.username) {
      nameError = "Mandatory Field.";
    }

    if (!this.state.password) {
      passwordError = "Mandatory Field.";
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
      var hostname = window.location.hostname;
      var endpoint = "/api/creds";
      var port = "3001";
      var url = "http://"+hostname+":"+port+endpoint;
      fetch(url, {
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
          console.log(JSON.stringify(msg));
        });
    }
  }

  render() {
    return (
      <div className="page-login">
        <p>This is the login page!</p>
        <form onSubmit={this.handleSubmit}>
          Username:
          <br />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 14, color: "red" }}>
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
          <div style={{ fontSize: 14, color: "red" }}>
            {this.state.passwordError}
          </div>
          <br />
          <input type="submit" value="Sign In" />
          <div class="page-newAccountArea">
            <p>
              <Link to="/newaccount">Create New Account</Link>
            </p>
          </div>
          <p>It's Free and always will be. </p>
        </form>
      </div>
    );
  }
}
