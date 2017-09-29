// this is code for importing data from the SharePoint Online list


//var cv_tt_endpoint = "https://takana14.sharepoint.com/sites/pa/_api/web/lists/getbytitle('Tatar')/Items?$filter=tisb eq 1&$select=Id,Title,dg2u, tisb&$top=10000"


//jQuery.getJSON(cv_tt_endpoint).done(function() { tolle = arguments; })
//var results = tolle[0].value //313
//var lines = results.map(function(res) { return 'cv. ' + res.Title + ' - tt. ' + res.dg2u; })
//var text = lines.join('\r\n\* ')
//copy(text)

/*
Whole dictionary
Title - cv
dg2u - tt
kjkg - no
OData__x006d_t53 - expl


var cv_tt_endpoint2 = "https://takana14.sharepoint.com/sites/pa/_api/web/lists/getbytitle('Tatar')/Items?$top=10000&$select=Title,dg2u,kjkg,OData__x006d_t53"
var lines = results.map(function(res) {return {cv:res.Title, tt: res.dg2u, no: res.kjkg, expl: res.OData__x006d_t53 };})
var dictionary = { description: '', words: lines};
dictionary.description = 'This is Skvortsov`s Chuvash-Tatar dictionary from 1994. Digitalized by Miron Toli @mirontoli 2016-11-26. cv means the Chuvash word. tt means its Tatar translation. no means the number of the same word with different meanings (translations). expl means the actual article, explanation. expl is used very seldom.';
var text = JSON.stringify(dictionary)
copy(text)
*/

//
////ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
//jquery load
var jq = document.createElement('script');jq.src = 
"/sites/pa/Style%20Library/jquery-3.2.1.min.js";document.getElementsByTagName('head')[0].appendChild(jq); setTimeout(function() {jQuery.noConflict(); console.log('jQuery loaded'); extract(); }, 1000);void(0);



function extract() {
  var endpoint = "https://takana14.sharepoint.com/sites/pa/_api/web/lists/getbytitle('Swedish')/Items?$select=Title,cv,Body&$orderby=Title&$top=1000000"
  jQuery.getJSON(endpoint)
    .done(function() { 
      var entries = arguments[0].value;
      var results = [];
      for(var i = 0; i < entries.length; i++) { 
        var e = entries[i];
        results.push({cv:e.cv,sv:e.Title, body: e.Body }); 
      }
      var dictionary = { imported: new Date(), words: results };
      console.log('word count', dictionary.words.length);
      var json = JSON.stringify(dictionary);
      window.tolle = json;
      console.warn("Run copy(tolle) in console to get the latest dictionary");
      //copy(JSON.stringify(dictionary));
      //paste into dict.js
  });
}

