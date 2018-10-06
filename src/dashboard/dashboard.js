import React, { Component } from 'react';
import io from 'socket.io-client';
import './dashboard.css';
import { HOSTNAME, SERVERPORT} from "../global";
import { AuthenticationContext, AuthCheck } from '../authentication';

var socket = io("http://"+HOSTNAME+SERVERPORT);

function subscribeSamples(cb) {
	socket.on('receivePosts',(data) => {
		cb(data);
	});
}

class NewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsposts: []
		}
		socket.emit("loadPosts");
		subscribeSamples((data) => {
			var currentlist = this.state.newsposts;
			for (var i=0; i<data.length; i++) {
				currentlist.unshift(data[i]);
			}
			var a = currentlist.slice(0,5);
			this.setState({newsposts: a});
		});
	}
	
	makeNewsList() {
		var listdom = this.state.newsposts.map((post) =>
			<div key={post.id} className="dashboard-newspost">
				<p><b>{post.title}</b><br />{post.content}<br /><i>Post by {post.author} on {post.source}; {post.posted};</i><br /></p>
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
			<AuthenticationContext.Consumer>
				{({isAuthenticated, AuthenticatedName, Authenticate, unAuthenticate, setAuthenticatedName}) => (
					<AuthCheck isAuthenticated={isAuthenticated}/>
				)}
			</AuthenticationContext.Consumer>
		  <NewsList/>
		</div>
    );
  }
}