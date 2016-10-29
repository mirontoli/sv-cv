var WordPresentation = React.createClass({
	render: function() {
		var filterText = this.props.filterText;
		//var sv = filterText ? this.props.word.sv.replace(filterText, "<mark>" + filterText + "</mark>") : this.props.word.sv;
		var sv = this.props.word.sv;
		return <div><strong>{sv}</strong> : {this.props.word.cv}
			<br/><em>{this.props.word.body} </em>
		</div>;
	}
});
var WordList = React.createClass({
	render: function() {
		var rows = [];
		var filterText = (this.props.filterText || '').toLowerCase();

	    this.props.words.forEach(function(word) {
	    	var match = !filterText  
	    		|| word.sv.toLowerCase().indexOf(filterText) > -1
	    		|| word.cv.toLowerCase().indexOf(filterText) > -1
	    		|| (word.body && word.body.toLowerCase().indexOf(filterText) > -1);

	    	if (match) {
	    		rows.push(<WordPresentation word={word} filterText={filterText}/>);
	    	}
        	
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


