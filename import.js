# this is code for importing data from the SharePoint Online list
var endpoint = "https://takana14.sharepoint.com/sites/pa/_api/web/lists/getbytitle('Swedish')/Items?$select=Title,cv,Body&$orderby=Title"

#jquery load
#var jq = document.createElement('script');jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(jq); setTimeout(function() {jQuery.noConflict(); console.log('jQuery loaded'); }, 1000);void(0);

      function extract() {
        jQuery.getJSON(endpoint)
          .done(function() { 
            window.tolle = arguments; 
            var entries = tolle[0].value;
            var result = "";
            for(var i = 0; i < entries.length; i++) { 
              result += entries[i].Entry + "\n"; 
            }
            copy(result);
        });
      }
