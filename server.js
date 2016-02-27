var http = require('http');
var fs = require('fs');

var message = 'I am so happy to be part of the Node Girls workshop';

function handler(request, response) {
	var endpoint = request.url;
	console.log(endpoint);

	var method = request.method;
	console.log(method);

	response.writeHead(200, {"Content-Type": "text/html"});
	if (endpoint === '/') {
		fs.readFile(__dirname+'/public/index.html', function(error, file) {
			if (error) {
				console.log(error);
				return;
			}
			response.end(file);
		});
	}
	else {
		if (endpoint === '/node') {
			response.write("We <3 Node!");
		}
		else if (endpoint === '/girls') {
			response.write('We are girls!');
		}
		else {
	 		response.write(message); //response body
		}
	  	response.end(); // finish response
	}
}

var server = http.createServer(handler);

server.listen(3000, function(){
  console.log("Server is listening on port 3000. Ready to accept your commands :p");
});
