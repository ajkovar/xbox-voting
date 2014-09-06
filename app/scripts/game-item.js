/** @jsx React.DOM */
var Fluxxor = require("fluxxor");
var React = require("react");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

module.exports = React.createClass({
  mixins: [FluxChildMixin],

  propTypes: {
    game: React.PropTypes.object.isRequired
  },

  render: function() {
    var style = {
      textDecoration: this.props.game.complete ? "line-through" : ""
    };

    return <span style={style} onClick={this.onClick}>{this.props.game.title}</span>;
  }
});
