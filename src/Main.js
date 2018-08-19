import React, { Component } from 'react';

class NewsPost extends Component {
	render() {
		return (
			<div class='main-post'>
				<p><b>Post Heading</b></p>
				<p>Post description here...</p>
			</div>
		);
	}
}

export default class Main extends Component {
  render() {
    return (
		<div class='page-main'>
		  <p>This is the main page!</p>
		  <NewsPost />
		  <NewsPost />
		  <NewsPost />
		  <NewsPost />
		  <NewsPost />
		</div>
    );
  }
}