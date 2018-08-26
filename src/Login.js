import React, { Component } from "react";

export default class Login extends Component {
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

        <form>
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
}
