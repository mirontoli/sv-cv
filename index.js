var WordPresentation = React.createClass({
	render: function() {
		return <div>{this.props.word.sv} : {this.props.word.cv}</div>;
	}
});
var WordList = React.createClass({
	render: function() {
		var rows = [];
	    this.props.words.forEach(function(word) {
        	rows.push(<WordPresentation word={word} />);
	    });
		return <div>{rows}</div>;
	}
});

jQuery.getJSON("dict.json").done(function(data){
	var WORDS = data.words;
	ReactDOM.render(<WordList words={WORDS}/>, document.getElementById('root'));
});


