var WordPresentation = React.createClass({
	render: function() {
		return <div><strong>{this.props.word.sv}</strong> : {this.props.word.cv}
			<br/><em>{this.props.word.body} </em>
		</div>;
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
var SearchBar = React.createClass({
	render: function() {
		return <form style="display:none;">
        	<input type="text" placeholder="Шыра..." value={this.props.filterText} />
        </form>;
	}
});

var FilterableWordList = React.createClass({
	render: function() {
		this.state = this.state || { filterText: '' };
		return <div>
	        <SearchBar
	          filterText={this.state.filterText}
	        />
	        <WordList
	          words={this.props.words}
	          filterText={this.state.filterText}
	        />
	      </div>
	}
});

jQuery.getJSON("dict.json").done(function(data){
	var WORDS = data.words;
	ReactDOM.render(<WordList words={WORDS}/>, document.getElementById('root'));
});


