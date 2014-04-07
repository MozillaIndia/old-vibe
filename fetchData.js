/****************************************************
 * Fetch Indian events from reps.mozilla.org and 
 * write the data to a data file in same folder.
 ***************************************************/

var https = require('https');
var fs = require('fs');
var isFirstRequest = true;
var dateToday = new Date();
var dateString = dateToday.getFullYear() + "-" + (dateToday.getMonth()+1) + "-" + dateToday.getDate()
var repsUri = 'https://reps.mozilla.org/api/v1/event/?offset=0&limit=0&start__gte=' + dateString + '&query=india';

https.get(repsUri, function(res) {
        
        res.on('data', function(eventData) {
            if(isFirstRequest){
                // First Time Request
                
                fs.writeFile("data", eventData);
                isFirstRequest = false;
                console.log("true");
            
            }
            else{

                fs.appendFile("data", eventData);
                console.log("false");
            
            }
        });
        }).on('error', function(e) {
            console.error(e);
});
