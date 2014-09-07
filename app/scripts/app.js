/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");

var FluxMixin = Fluxxor.FluxMixin(React);

module.exports = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return (
      <div className="container">
        <h1>Xbox Voting</h1>
        <this.props.activeRouteHandler/>
      </div>
    )
    
  }
});
