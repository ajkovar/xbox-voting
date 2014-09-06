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

var app = new App();
React.renderComponent(<App flux={flux} />, document.body);
