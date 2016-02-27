var http = require('http');
var fs = require('fs');

var message = 'I am so happy to be part of the Node Girls workshop';

function handler(request, response) {
	var endpoint = request.url;
	console.log(endpoint);

	var method = request.method;
	console.log(method);

	/* First if should be a control check for hackers who want to look at our files
	or stupid people who don't know how to search :p */
	if (endpoint === '/') {
		response.writeHead(200, {"Content-Type": "text/html"});
		fs.readFile(__dirname+'/public/index.html', function(error, file) {
			if (error) {
				console.log(error);
				return;
			}
			response.end(file);
		});
	}
	else if (endpoint === '/node') {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("We <3 Node!");
		response.end(); // finish response
		// Alternative: response.end("We <3 Node!");
	}
	else if (endpoint === '/girls') {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('We are girls!');
  	response.end(); // finish response
	}
	else {
		if (endpoint.indexOf('.css') > -1) {
			response.writeHead(200, {"Content-Type": "text/css"});
		}
		if (endpoint.indexOf('.jpg') > -1) {
			response.writeHead(200, {"Content-Type": "image/jpg"});
		}
		fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
			if (error) {
				console.log(error);
				return;
			}
			response.end(file); // finish response
		});
	}
}

var server = http.createServer(handler);

server.listen(3000, function(){
  console.log("Server is listening on port 3000. Ready to accept your commands :p");
});
