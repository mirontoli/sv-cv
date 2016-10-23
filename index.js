var HelloMessage = React.createClass({
  render: function () {
    return <h1>Hello {this.props.message}!</h1>;
  }
});

ReactDOM.render(<HelloMessage message="World" />, document.getElementById('root'));
