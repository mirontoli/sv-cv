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
	    		|| (word.cv && word.cv.toLowerCase().indexOf(filterText) > -1)
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

var tolleCache = localStorage.getItem("words");
var WORDS = !!tolleCache ? JSON.parse(tolleCache) : undefined;
if (WORDS) {
	//no "React" if executed directly, must postpone with setTimeout
	setTimeout(() => {
		ReactDOM.render(<FilterableWordList3 words={WORDS}/>, document.getElementById('root'));
		showWord();
	});
	
}
else {
	var url = "https://prod-16.westeurope.logic.azure.com:443/workflows/9386aa2a0dbb4593a8ecaaefa227e1a5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RAfD2U9omt_UbKRrMNOuGva81QnWUIJC9aU7ZsLvLcI";
	//jQuery.getJSON("dict.json?v=2018-01-24a")
	jQuery.post( url, { name: "mironov" } )
	//.done(function(data) {window.tolle = data})
	.done(function(data){
		WORDS = data.value.map( v => { return {cv: v.cv, sv: v.Title, body: v.Body }});
		localStorage.setItem("words", JSON.stringify(WORDS));
		ReactDOM.render(<FilterableWordList3 words={WORDS}/>, document.getElementById('root'));
		showWord();
	});
}


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
/*
setTimeout(() => {
	console.log("loading sentences");
	var cachedSentencesJson = localStorage.getItem("sentences");
	
	jQuery.getJSON("https://prod-40.westeurope.logic.azure.com/workflows/9b5d8935bcc04d3fbb24334a9fd85117/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YdLrehkFFugs6nGgsuKWU_D_Vzgb3XgYX8Yi-WTjI_E")
	.done(data => {

		window.tolle = data;
		var sentences = data.d.results;
		localStorage.setItem("sentences", JSON.stringify(sentences));
	});
}, 5000);
*/
