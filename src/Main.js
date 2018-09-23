import React, { Component } from 'react';

class NewsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsposts: this.props.newsposts
		}
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

var sample = [
	{id: 1, title: 'TestA', content: 'This is the body! Something exciting happened!', posted:'24/3/18', author:'Mitchell Clarke', source:'Facebook'},
	{id: 2, title: 'TestB', content: 'Yet another post... such hard work!', posted:'30/4/18', author:'@MJClarke93', source:'Facebook'},
	{id: 3, title: 'TestC', content: 'I saw a deer today', posted:'11/1/18', author:'Admin', source:'Up2Date'}
];

export default class Main extends Component {
  render() {
    return (
		<div class="page-main">
		  <NewsList newsposts={sample}/>
		</div>
    );
  }
}