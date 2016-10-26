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
		var filterText = this.props.filterText;
	    this.props.words.forEach(function(word) {
	    	
	    	var match = !(word.sv.indexOf(filterText) === -1);
	    	if(!match) {
	    		match = !(word.cv.indexOf(filterText) === -1)
	    	}
	    	if (word.sv.indexOf(filterText) === -1) {
	    		return;
	    	}
        	rows.push(<WordPresentation word={word} />);
	    });
		return <div id="wordlist">{rows}</div>;
	}
});

class SearchBar3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    );
  }
  
  render() {
    return (
      <div id="search">
	      <form>
	        <input 
	        	type="text" 
	    		placeholder="Сӗр (фильтровать ту)..." 
	          	value={this.props.filterText}
	          	ref="filterTextInput"
	          	onChange={this.handleChange}
	    	/>
	      </form>
      </div>
    );
  }
}

class FilterableWordList3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <SearchBar3
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <WordList
          words={this.props.words}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}


jQuery.getJSON("dict.json").done(function(data){
	var WORDS = data.words;
	ReactDOM.render(<FilterableWordList3 words={WORDS}/>, document.getElementById('root'));
});


