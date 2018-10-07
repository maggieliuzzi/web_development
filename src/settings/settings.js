import React, { Component } from "react";
import "./settings.css";
import { HOSTNAME, SERVERPORT } from "../global";
import { AuthenticationContext, AuthCheck } from "../authentication";
import { browserHistory } from "react-router";

class TagForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existing_tags: "Google, Elon Musk, Android",
      TagError: "",
      new_tags: ""
    };

    // There needs to be another fetch to grab existing_tags from the server
    // Would be a GET to "/api/prefs/"+{this.props.AuthenticatedName}

    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleTagSubmit(event) {
    // Code used to submit new tags of user's interest
    event.preventDefault();

    var username = this.props.AuthenticatedName;
    var new_tags = null; // Get the new tags from the form here.
    var fetch_url = "http://" + HOSTNAME + SERVERPORT + "/api/prefs";
    fetch(fetch_url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        tags: this.state.new_tags
      })
    })
      .then(res => {
        return res.json();
      })
      .then(msg => {
        if (msg.success === true) {
          if (msg.result === true) {
            this.setState({ TagError: "" });
            this.props.Authenticate();
            browserHistory.push("/dashboard");
            this.props.setAuthenticatedName(this.state.username);
          } else {
            this.setState({
              TagError: "Please resubmit valid Username and password"
            });
          }
        } else {
          this.setState({ TagError: "An error occured: " + msg.error });
        }
        console.log(JSON.stringify(msg));
      });
  }

  render() {
    return (
      <div name="settings-tags">
        <br />
        <p>
          To update the keywords you want to see posts about, enter them below
          (separated by commas):
        </p>
        <form onSubmit={this.handleTagSubmit}>
          <input
            id="tags_input"
            type="texta"
            name="tags"
            value={this.props.existing_tags}
          />
          <br />
          <div style={{ fontSize: 14, color: "red" }}>{this.state.Error}</div>
          <input id="update_tags_button" type="submit" value="Update Tags" />
        </form>
      </div>
    );
  }
}
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UpdateError: "",
      old_password: "",
      new_password: ""
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleUpdate(event) {
    // Code for when the user clicks button to update their credentials
    event.preventDefault();
    var username = this.props.AuthenticatedName;
    console.log(this.props.AuthenticatedName);

    var fetch_url = "http://" + HOSTNAME + SERVERPORT + "/api/creds";
    fetch(fetch_url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //username, password and new_password used at DB
        username: username,
        password: this.state.old_password,
        new_password: this.state.new_password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(msg => {
        console.log(JSON.stringify(msg));
        if (msg.success === true) {
          if (msg.result === true) {
            this.setState({ UpdateError: "" });
            browserHistory.push("/dashboard");
            this.props.Authenticate();

            this.props.setAuthenticatedName(this.state.username);
          } else {
            this.setState({
              UpdateError: "Please enter valid username and password"
            });
          }
        } else {
          this.setState({ UpdateError: "An error occurred: " + msg.error });
        }
      });
  }

  render() {
    return (
      <div id="settings-update">
        <br />
        <p>To update your password, enter your new and old password below:</p>
        <form onSubmit={this.handleUpdate}>
          Old Password:
          <input
            type="password"
            name="old_password"
            value={this.state.old_password}
            onChange={this.handleChange}
          />
          <br />
          New Password:
          <input
            type="password"
            name="new_password"
            value={this.state.new_password}
            onChange={this.handleChange}
          />
          <br />
          <input
            id="update_pwd_button"
            type="submit"
            value="Update Password"
            //SonSubmit={this.handleUpdate}
          />
        </form>
      </div>
    );
  }
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
class DeleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteError: "",
      password: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDelete(event) {
    // Code for when the user clicks the button to delete their account
    event.preventDefault();
    var username = this.props.AuthenticatedName;
    var fetch_url = "http://" + HOSTNAME + SERVERPORT + "/api";
    fetch(fetch_url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(msg => {
        if (msg.success === true) {
          if (msg.result === true) {
            this.setState({ DeleteError: "" });
            this.props.unAuthenticate();
            browserHistory.push("/login");
          } else {
            this.setState({
              DeleteError: "Username and password do not match."
            });
          }
        } else {
          this.setState({ DeleteError: "An error occured: " + msg.error });
        }
        console.log(JSON.stringify(msg));
      });
  }

  render() {
    return (
      <div id="settings-delete">
        <br />
        <p>To completely delete your account, enter your password below:</p>
        <form onSubmit={this.handleDelete}>
          Password :
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button
            id="delete_account_button"
            type="submit"
            onClick={this.handleDelete}
          >
            Delete Account
          </button>
        </form>
      </div>
    );
  }
}

export default class Settings extends Component {
  render() {
    return (
      <div id="settings_page" className="page-settings">
        <div id="settings_form">
          <p id="settings_header">Settings</p>
          <AuthenticationContext.Consumer>
            {({
              isAuthenticated,
              AuthenticatedName,
              Authenticate,
              unAuthenticate,
              setAuthenticatedName
            }) => (
              <span>
                <AuthCheck isAuthenticated={isAuthenticated} />
                <TagForm AuthenticatedName={AuthenticatedName} />
                <UpdateForm AuthenticatedName={AuthenticatedName} />
                <DeleteForm
                  AuthenticatedName={AuthenticatedName}
                  unAuthenticate={unAuthenticate}
                />
              </span>
            )}
          </AuthenticationContext.Consumer>
        </div>
      </div>
    );
  }
}
