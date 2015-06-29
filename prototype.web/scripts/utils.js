define(["core"], function(core) {
    
    // Adapted from the net
    function loadJSON(jsonPath, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonPath, true); 
        // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will 
                // NOT return a value but simply returns undefined in 
                // asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
    }
    
    // Adapted from the net
    function includeJSON(path) {
        var ret = {};
        loadJSON(path, function(response) {
            // Parse JSON string into object
            ret = JSON.parse(response);
        });
        
        return ret;
    }
    
    return {
        loadJSON:       loadJSON,
        includeJSON:    includeJSON
    }
});

