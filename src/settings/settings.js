import React, { Component } from "react";
import "./settings.css";
import { HOSTNAME, SERVERPORT } from "../global";
import { AuthenticationContext, AuthCheck } from '../authentication';


class TagForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existing_tags: "Google, Elon Musk, Android",
    };

    // There needs to be another fetch to grab existing_tags from the server
    // Would be a GET to "/api/prefs/"+{this.props.AuthenticatedName}

    this.handleTagSubmit = this.handleTagSubmit.bind(this);
  }

  handleTagSubmit(event) {
    // Code for when the user submits their new tags of interest
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
        tags: new_tags
      })
    }).then(
      // ...check if the response was successful / display errors
    );
  }

  render() {
    return (
      <div name="settings-tags">
        <br /><p>To update the tags you want to recieve news about, enter them below (seperated by commas):</p>
        <input type="texta" name="tags" value={this.props.existing_tags}/>
        <br /><input type="submit" value="Update Tags" onClick={this.handleTagSubmit}/>
      </div>
    );
  }
}


class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.Update = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    // Code for when the user clicks button to update their credentials
    event.preventDefault();
    var username = this.props.AuthenticatedName;
    var old_password = null; // Read from the form
    var new_password = null; // Read from the form
    var fetch_url = "http://" + HOSTNAME + SERVERPORT + "/api/creds";
    fetch(fetch_url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: old_password,
        new_password: new_password
      })
    }).then(
      // ...check if the response was successful / display errors
    );
  }

  render() {
    return (
      <div id="settings-update">
        <br /><p>To update your account's password, enter your new password and old password below:</p>
        <form>
        <input type="password" name="newpassword" />
        <br /><input type="password" name="oldpassword" />
        <br /><input type="submit" value="Update Password" onClick={this.handleUpdate}/>
        </form>
      </div>
    );
  }
}


class DeleteForm extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    // Code for when the user clicks the button to delete their account
    event.preventDefault();
    var username = this.props.AuthenticatedName;
    var password = null; // Read from the form
    var fetch_url = "http://" + HOSTNAME + SERVERPORT + "/api";
    fetch(fetch_url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then(
      // ...check if the response was successful / display errors
      this.props.unAuthenticate() // Only if successful
    );
  }

  render() {
    return (
      <div id="settings-delete">
        <br /><p>To completely delete your account, enter your password below:</p>
        <form>
          <input type="password" name="password" />
          <br /><button type="submit" onClick={this.handleDelete}>Delete Account</button>
        </form>
      </div>
    );
  }
}


export default class Settings extends Component {
  render() {
    return (
      <div className="page-settings">
        <p>This is the settings page!</p>
        <AuthenticationContext.Consumer>
          {({isAuthenticated, AuthenticatedName, Authenticate, unAuthenticate, setAuthenticatedName}) => (
            <span>
              <AuthCheck isAuthenticated={isAuthenticated}/>
              <TagForm AuthenticatedName={AuthenticatedName} />
              <UpdateForm AuthenticatedName={AuthenticatedName} />
              <DeleteForm AuthenticatedName={AuthenticatedName} unAuthenticate={unAuthenticate}/>
            </span>
          )}
        </AuthenticationContext.Consumer>
      </div>
    );
  }
}
