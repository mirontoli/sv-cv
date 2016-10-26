// this is code for importing data from the SharePoint Online list
var endpoint = "https://takana14.sharepoint.com/sites/pa/_api/web/lists/getbytitle('Swedish')/Items?$select=Title,cv,Body&$orderby=Title"

//jquery load
var jq = document.createElement('script');jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(jq); setTimeout(function() {jQuery.noConflict(); console.log('jQuery loaded'); }, 1000);void(0);

function extract() {
  jQuery.getJSON(endpoint)
    .done(function() { 
      var entries = arguments[0].value;
      var results = [];
      for(var i = 0; i < entries.length; i++) { 
        var e = entries[i];
        results.push({cv:e.cv,sv:e.Title, body: e.Body }); 
      }
      var dictionary = { imported: new Date(), words: results };
      var json = JSON.stringify(dictionary);
      window.tolle = json;
      window.prompt("Run copy(tolle) in console to get the latest dictionary");
      //copy(JSON.stringify(dictionary));
      //paste into dict.js
  });
}

extract()
