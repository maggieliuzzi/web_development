import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

import './site.css';

export default class App extends Component {
  render() {
    return (
      <div class="site-container">
		<Header />
        {this.props.children}
		<Footer />
      </div>
    );
  }
}
