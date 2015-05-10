var express = require('express');
var fs = require('fs');
var errorPage = fs.readFileSync("./404.html");
var fetchData = require("./fetchData.js");
var app = express();
var r = express.Router();

app.use(express.static('assets'));

r.get('/', function(req, res) {
	var data = fs.readFileSync('index.html', 'utf8');
	res.send(data.toString());
});

r.get('/data', function(req, res) {
	var data = fs.readFileSync("data", 'utf-8');
	res.setHeader('Content-Type', 'json/application');
	res.end(data);
});

r.get('*', function(req, res) {
	var p = 'assets/templates' + req.params[0]+ ".html";
	// Update with the new templates
	fs.exists(p, function(exists) {
		if(exists) {
			fs.readFile(p, function(err, d) {
				if(err) 
				   res.end(errorPage.toString(), 'utf-8');
			        else
				   res.end(d, 'utf-8');
			});
		}
		else {
			res.end(errorPage.toString(), 'utf-8');
		}
	});
});


app.use('/', r);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
