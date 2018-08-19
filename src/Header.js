import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
		<div class="site-header">
			<p>This is the header - <Link to="/login">Login</Link> - <Link to="/settings">Settings</Link></p>
		</div>
    );
  }
}

