/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");

var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxChildMixin],

  render: function() {
    return <div>New Game</div>
  }
});
