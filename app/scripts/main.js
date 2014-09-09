/** @jsx React.DOM */
/**
 * scripts/main.js
 *
 * This is the starting point for the application.
 */

'use strict';

var App = require('./views/app.js');
var React = require("react");
var flux = require('./flux.js');
var ReactRouter = require("react-router");
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var GameList = require("./views/game-list")
var $ = require("jquery");

React.renderComponent((
  <Routes location="hash">
    <Route path="/" handler={App} flux={flux}>
      <DefaultRoute handler={GameList} status="wantit" />
      <Route name="wanted" handler={GameList} status="wantit" />
      <Route name="owned" handler={GameList} status="gotit" />
    </Route>
  </Routes>
), document.body);

$.ajaxPrefilter(function( options ) {
    var success = options.success;
    options.success = function(result){
      if(result==="false"){
          alert("API KEY INVALID.. Do some error handing action here..")
      }
      success.apply(this, arguments)
    }
});
