/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("GameStore")],

  getStateFromFlux: function() {
    return this.getFlux().store("GameStore").getState();
  },

  render: function() {
    return (
      <div className="container">
        <h1>Xbox Voting</h1>
        <div className="text-danger">{this.state.error ? this.state.error : ""}</div>
        <this.props.activeRouteHandler/>
      </div>
    )
    
  }
});
