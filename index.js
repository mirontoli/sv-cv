var MarkedNode = React.createClass({
	render: function() {
		var text = this.props.text;
		var filterText = this.props.filterText;
		// if filterText is negative or text is nil, 
		// then there is nothing to highlight
		if (!filterText || !text) {
			return <span>{this.props.text}</span>;
		}
		var regex = new RegExp('('+filterText+')', 'ig');
		var html = text.replace(regex, function(m) { return '<mark>' + m + '</mark>'; })
		return <span dangerouslySetInnerHTML={{ __html: html }}></span>;
	}
});
var WordPresentation = React.createClass({
	render: function() {
		var filterText = this.props.filterText;
		//var sv = filterText ? this.props.word.sv.replace(filterText, "<mark>" + filterText + "</mark>") : this.props.word.sv;
		var sv = this.props.word.sv;
		return <div>
				<strong>
					<MarkedNode text={this.props.word.sv} filterText={this.props.filterText}/>
				</strong> : <MarkedNode text={this.props.word.cv} filterText={this.props.filterText} />
				<br/>
				<em><MarkedNode text={this.props.word.body} filterText={this.props.filterText} />
				</em>
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


jQuery.getJSON("dict.json?v=2018-01-24a").done(function(data){
	var WORDS = data.words;
	ReactDOM.render(<FilterableWordList3 words={WORDS}/>, document.getElementById('root'));
	showWord();
});

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function kioskifyIfNeeded() {
	if(getParameterByName("kiosk")) {
		document.body.className += " kiosk";
	}
}
kioskifyIfNeeded();

function showWord() {
	var wordlist = jQuery("#wordlist");
	var divs = wordlist.find("> div");
	var count = divs.length;
	var div;
	var timer;
	//read interval or use default 600 seconds
	var interval = parseInt(getParameterByName("interval")) || 600;


	var moveForward = function() {
		//remove previous word and clear timeout
		div && div.removeClass("show");
		clearTimeout(timer);

		//show new random word
		var random = Math.floor(Math.random() * count) + 1;
		div = wordlist.find(":nth-child(" + random + ")");
		div.addClass("show");

		// set timeout to renew after 10 minutes
		timer = setTimeout(moveForward, interval*1000);
	}
	moveForward();
}


