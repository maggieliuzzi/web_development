import React, { Component } from "react";
import "./settings.css";
import g from "../global";

export default class Settings extends Component {
  render() {
    return (
      <div class="page-settingHeader">
        <p>This is the settings page!</p>
        <form>
          <b>Profile Settings</b>
        </form>

        <div class="page-settingBody">
          <p>Re-confirm Your Details before changes !!</p>
        </div>
      </div>
    );
  }
}
