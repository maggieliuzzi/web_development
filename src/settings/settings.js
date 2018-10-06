import React, { Component } from "react";
import "./settings.css";
import { HOSTNAME, SERVERPORT } from "../global";
import { AuthenticationContext, AuthCheck } from '../authentication';

export default class Settings extends Component {
  render() {
    return (
      <div className="page-settingHeader">
        <AuthenticationContext.Consumer>
          {({isAuthenticated, AuthenticatedName, Authenticate, unAuthenticate, setAuthenticatedName}) => (
            <AuthCheck isAuthenticated={isAuthenticated}/>
          )}
        </AuthenticationContext.Consumer>
        <p>This is the settings page!</p>
        <form>
          <b>Profile Settings</b>
        </form>

        <div className="page-settingBody">
          <p>Re-confirm Your Details before changes !!</p>
        </div>
      </div>
    );
  }
}
