/** @jsx React.DOM */
/**
 * scripts/main.js
 *
 * This is the starting point for the application.
 */

'use strict';

var App = require('./app.js');
var React = require("react");
var flux = require('./flux.js');
var ReactRouter = require("react-router");
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var GameList = require("./game-list")
var NewGame = require("./new-game")

React.renderComponent((
  <Routes location="hash">
    <Route path="/" handler={App} flux={flux}>
      <DefaultRoute handler={GameList} />
      <Route name="list" handler={GameList} />
      <Route name="new" handler={NewGame} />
    </Route>
  </Routes>
), document.body);
