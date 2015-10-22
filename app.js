// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  
  response.writeHead(200, {"Content-Type": "text/plain"});
  if(request.url=='/new')
  response.end("Hello World\n");
  response.end("Hell22o World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
var ip = process.env.IP || '192.168.178.1',
    port = process.env.PORT || 3000;
server.listen(port,ip);