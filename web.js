var express = require('express');
var fs = require('fs');
var errorPage = fs.readFileSync("./404.html");
var app = express.createServer(express.logger());
app.use("/css", express.static(__dirname+'/assets/css/'));
app.use("/js", express.static(__dirname+'/assets/js/'));
app.use("/img", express.static(__dirname+'/assets/img/'));

app.get('/', function(request, response) {
    var data = fs.readFileSync('index.html', 'utf8');

    response.send(data.toString());
});
app.get('*', function(request, response){
	var path = 'assets/templates'+request.params[0]+".html";
	fs.exists(path, function(exists){
		if (exists){
			fs.readFile(path, function(err, data){
				console.log(response, data);
				if (!err)
					response.end(data, 'utf-8');
				else
					response.end(errorPage.toString(), 'utf-8');
			});
		}else{
			response.end(errorPage.toString(), 'utf-8');
		}
	});
});
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
