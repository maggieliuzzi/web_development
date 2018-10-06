import React, { Component } from 'react';
import io from 'socket.io-client';
import './dashboard.css';

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
			var a = currentlist.slice(0,5);
			this.setState({newsposts: a});
		});
	}
	
	makeNewsList() {
		var listdom = this.state.newsposts.map((post) =>
			<div key={post.id} className="dashboard-newspost">
				<p><b>{post.title}</b><br />{post.content}<br /><i>Posted by {post.author} from {post.source} on {post.posted}</i><br /></p>
			</div>
		);
		return listdom
	}
	
	render() {
		return(
			<div className="dashboard-newslist">
				{this.makeNewsList()}
			</div>
		);
	}
}

export default class Dashboard extends Component {
  render() {
    return (
		<div className="page-dashboard">
		  <NewsList/>
		</div>
    );
  }
}