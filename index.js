var WordPresentation = React.createClass({
	render: function() {
		return <div>hej</div>;
	}
});
var HelloMessage = React.createClass({
  render: function () {
    return <h1>Hello {this.props.message}!</h1>;
  }
});

#ReactDOM.render(<HelloMessage message="World" />, document.getElementById('root'));
ReactDOM.render(<WordPresentation />, document.getElementById('root'));

