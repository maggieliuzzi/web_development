import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import { Route } from 'react-router';

import App from './App.js';
import Main from './MainPage.js';
import Login from './Login.js';
import Settings from './Settings.js';

export default (
  <Route path="/" component={App}>
    <Route path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/settings" component={Settings} />
  </Route>
);

/*

Use Link for navigation

Anywhere in your component render function's return JSX value, use the Link component:

import { Link } from 'react-router';
(...)
<Link to="/some/where">Click me</Link>

*/