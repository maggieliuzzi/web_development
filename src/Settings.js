import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
    return (
		<div class='page-settings'>
		  <p>This is the settings page!</p>
		  <form>
			<b>Profile Settings</b>
			<br/><br/>Setting 1: <input type="text"/>
			<br/>Setting 2: <input type="checkbox"/>
			<br/>Setting 3: <input type="checkbox"/>
			<br/><br/><input type="submit" value="Submit"/>
		  </form>
		</div>
    );
  }
}