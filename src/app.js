import React, { Component } from 'react';

import Header from './header/header.js';
import Footer from './footer/footer.js';

import './site.css';

export default class App extends Component {
  render() {
    return (
      <div className="site-container">
		<Header />
        {this.props.children}
		<Footer />
      </div>
    );
  }
}
