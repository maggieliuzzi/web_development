import React, { Component } from "react";

/*export default class Login extends Component {
  state = {};
  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(user => this.setState(user));
  }
  render() {
    return (
      <div class="page-login">
        <p>This is the login page!</p>
        <p>
          id: {this.state.id}, Username: {this.state.username}, password:{" "}
          {this.state.password}
        </p>

        <form action="/api" method="post">
          Username:
          <br />
          <input type="text" name="username" value="maggieliuzzi" />
          <br />
          Password:
          <br />
          <input type="password" name="password" value="lalala" />
          <br />
          <br />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}*/
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
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
  handleSubmit(event) {
    event.preventDefault();
    fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
  }
  render() {
    return (
      <div class="page-login">
        <p>This is the login page!</p>
        <form onSubmit={this.handleSubmit}>
          Username : <br />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          Password: <br />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="log in" />
        </form>
      </div>
    );
  }
}
