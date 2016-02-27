var fs = require("fs");
var querystring = require("querystring");

function handler(request, response) {
  var endpoint = request.url;
  var method = request.method;
  console.log("endpoint:" + endpoint + ", method: " + method);

  if (endpoint === '/posts') {
      console.log('endpoint is posts');
      fs.readFile(__dirname+'/posts.json', function(error, file) {
          if (error) {
              console.log(error);
              return;
          }
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(file);
      });
      return;
  }
  else if (endpoint === '/create/post' && method === 'POST') {
      var blogData = '';
      request.on('data', function(chunkOfData) {
          blogData += chunkOfData;
      });
      request.on('end', function() {
          var convertedData = querystring.parse(blogData);
          var blogPostText = convertedData.post;

          fs.readFile(__dirname+'/posts.json', function(error, file) {
              if (error) {
                  console.log(error);
                  return;
              }
              var blogPosts = JSON.parse(file);
              blogPosts[Date.now()] = blogPostText;
              fs.writeFile(__dirname+'/posts.json', JSON.stringify(blogPosts), function(error) {
                  if (error) {
                      console.log(error);
                      return;
                  }
                  response.writeHead(308, {'Location':'/'});
                  response.end();
              });
          });
      });
  }
  else {
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
        else if (endpoint.indexOf('.js') > -1) {
          type = 'text/javascript';
        }
        response.writeHead(200, {"Content-Type": type});

        response.end(file);
      });
  }
}

module.exports = handler;
