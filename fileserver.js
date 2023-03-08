let fs = require('fs');
let path = require('path');
//Modules

exports.handleFileRequest = function(request, response, tmpURL) {
    // Split the requested file path by commas to sort words
    let splitPath = tmpURL.pathname.split('.');
    if (splitPath.length > 1) {
        let fileType = splitPath.pop().toLowerCase();
        let filePath = '';

        
        // Determine the file path based on whether it is in the public or the routes 
        if (tmpURL.pathname.startsWith('/routes/')) {
            filePath = '.' + tmpURL.pathname;
        } else {
            filePath = './public' + tmpURL.pathname;
        }
        
        // Reads the file and sends the appropriate response
        fs.readFile(filePath, function(error, data){
            if(!error) {
                switch (fileType){

                    case 'css':
                        response.writeHead(200, {'Content-Type': 'text/css'});
                        break;
                    case 'jpg':
                        response.writeHead(200, {'Content-Type': 'image/jpeg'});
                        break;
                    case 'png':
                        response.writeHead(200, {'Content-Type': 'image/png'});
                        break;
                    case 'html':
                        response.writeHead(200, {'Content-Type':'text/html'});
                        break;
                    case 'js':
                        response.writeHead(200, {'Content-Type':'application/javascript'});
                        break;
                }
                response.end(data);
            } else {
                console.log('File not found...' + filePath);
                response.writeHead(404, {'Content-Type':'text/plain'});
                response.end('Error 404 - Not Found');
            }
        });

        return true;
    }

    return false;
};
