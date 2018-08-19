import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Main extends Component {
  render() {
    return (
		<div>
		  <header />
		  <p>This is the main page!</p>
		  <footer />
		</div>
    );
  }
}