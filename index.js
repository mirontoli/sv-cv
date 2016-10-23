var WordPresentation = React.createClass({
	render: function() {
		return <div>hej</div>;
	}
});
var WordList = React.createClass({
	render: function() {
		var rows = [];
	    this.props.words.forEach(function(word) {
        	rows.push(<WordPresentation sv={word.sv} cv={word.cv} />);
	    });
		return <div>{rows}</div>;
	}
});

jQuery.getJSON("dict.json").done(function(data){
	var WORDS = data.dictionary.words;
	ReactDOM.render(<WordList words={WORDS}/>, document.getElementById('root'));
});


