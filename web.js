var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());
app.use("/css", express.static(__dirname+'/assets/css/'));
app.use("/js", express.static(__dirname+'/assets/js/'));
app.use("/img", express.static(__dirname+'/assets/img/'));

app.get('/', function(request, response) {
    var data = fs.readFileSync('index.html', 'utf8');

    response.send(data.toString());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
