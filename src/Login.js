import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
		<div class='page-login'>
		  <p>This is the login page!</p>
		  <form>
		  	  Username:<br/>
  			  <input type="text" name="username" value="maggieliuzzi"/>
			  <br/>
			  Password:<br/>
			  <input type="password" name="password" value="lalala"/>
			  <br/><br/>
			  <input type="submit" value="Log In"/>
		  </form>
		</div>
    );
  }
}