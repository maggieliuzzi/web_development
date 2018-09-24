import React, { Component } from 'react';
import { Link } from 'react-router';

import './header.css';

export default class Header extends Component {
  render() {
    return (
		<div class="site-header">
			<p><Link to="/dashboard">Dashboard</Link> - <Link to="/login">Login</Link> - <Link to="/settings">Settings</Link></p>
		</div>
    );
  }
}
