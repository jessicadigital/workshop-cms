var fs = require("fs");
var querystring = require("querystring");

function handler(request, response) {
  var endpoint = request.url;
  var method = request.method;
  console.log("endpoint:" + endpoint + ", method: " + method);

  if (endpoint === '/') {
    endpoint = '/index.html';
  }

  fs.readFile(__dirname + "/../public" + endpoint, function(error, file) {
    if (error) {
      console.log(error);
      return;
    }

    // Check the file type
    var type;
    if (endpoint.indexOf('.html') > -1) {
      type = 'text/html';
    }
    else if (endpoint.indexOf('.css') > -1) {
      type = 'text/css';
    }
    else if (endpoint.indexOf('.jpg') > -1) {
      type = 'image/jpg';
    }
    else if (endpoint.indexOf('.png') > -1) {
      type = 'image/png';
    }
    else if (endpoint.indexOf('.ico') > -1) {
      type = 'image/x-icon';
    }
    response.writeHead(200, {"Content-Type": type});

    response.end(file);
  });
}

module.exports = handler;