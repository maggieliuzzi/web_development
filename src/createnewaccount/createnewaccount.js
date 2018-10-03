import React, { Component } from "react";
import "./createnewaccount.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      totalError: ""
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
    let emailError = "";
    let passwordError = "";

    if (!this.state.username) {
      nameError = "Mandatory Field.";
    }

    if (!this.state.password) {
      passwordError = "Mandatory Field.";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Invalid Email Address !!";
    }

    if (!this.state.email) {
      emailError = "Mandatory Field.";
    }

    if (emailError || passwordError || nameError) {
      this.setState({ emailError, passwordError, nameError });
      return false;
    }

    return true;
  };

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({nameError: "", emailError: "", passwordError: ""})
      fetch("/api", {
        method: "POST",
        headers: {Accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      })
      .then((res) => {
        return res.json()
      })
      .then((msg) => {
        console.log(JSON.stringify(msg));
      });
    }
  }

  render() {
    return (
      <div className="page-newAccount">
        <p>Create New Account !!</p>
        <form onSubmit={this.handleSubmit}>
          Username : <br />
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
          Password: <br />
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
          Email: <br />
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 14, color: "red" }}>
            {this.state.emailError}
          </div><br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}
