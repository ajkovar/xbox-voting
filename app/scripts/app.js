/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");

var FluxMixin = Fluxxor.FluxMixin(React);

module.exports = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return <div><this.props.activeRouteHandler/></div>
    
  }
});
