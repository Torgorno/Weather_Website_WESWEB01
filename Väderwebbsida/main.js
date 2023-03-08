let http = require('http');
let URL = require('url').URL;
let routes = require('./routes.js');
let fileServer = require('./fileserver.js'); 
//Modules

function processRequest(request, response){
    // Parse the URL of the incoming request.
    let tmpURL = new URL('http://' + request.headers.host + request.url);
    
    let route = tmpURL.pathname.split('/').filter(x => x);
    
    if (!fileServer.handleFileRequest(request, response, tmpURL)){
        routes.processRoute(request, response, route);
    }
    
    
}
// Creates an HTTP server that calls the processRequest function to manage requests.
let httpServer = http.createServer(processRequest);
// Start listening for incoming requests on port 8080.
httpServer.listen(8080);
