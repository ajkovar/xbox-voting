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
    return (
      <tr>
        <td>{this.props.game.title}</td>
        <td>{this.props.game.votes}</td>
      </tr>
    );
  }
});
