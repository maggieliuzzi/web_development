// CommentBox.js
/* Setting a poller to fetch data from the server every 2 seconds (2000 miliseconds). 
   This is just going to hit our /api/comments endpoint and return an array of data. We will also add a bit of state to check for errors. 
   If we receive an error, we can print it to screen to show the user. */

import React, { Component } from 'react';
import 'whatwg-fetch';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      text: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch('/api/comments/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList data={this.state.data} />
        </div>
        <div className="form">
          <CommentForm author={this.state.author} text={this.state.text} />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default CommentBox;