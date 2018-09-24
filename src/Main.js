import React, { Component } from 'react';
import io from 'socket.io-client';
var socket = io('http://localhost:3001');

function subscribeSamples(cb) {
	socket.on('samplePost',(data) => {
		cb(data);
	});
}

class NewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsposts: []
		}
		subscribeSamples((data) => {
			var currentlist = this.state.newsposts;
			currentlist.unshift(data);
			console.log(data);
			this.setState(currentlist);
		});
	}
	
	makeNewsList() {
		var listdom = this.state.newsposts.map((post) =>
			<div key={post.id} class="main-newspost">
				<p><b>{post.title}</b><br />{post.content}<br /><i>Posted by {post.author} from {post.source} on {post.posted}</i><br /></p>
			</div>
		);
		return listdom
	}
	
	render() {
		return(
			<div class="main-newslist">
				{this.makeNewsList()}
			</div>
		);
	}
}

export default class Main extends Component {
  render() {
    return (
		<div class="page-main">
		  <NewsList/>
		</div>
    );
  }
}