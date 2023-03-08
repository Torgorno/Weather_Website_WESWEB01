let newProfiles = require('./routes/newProfiles.js');
let profiles = require('./routes/profiles');    
let WeatherPage = require('./routes/Weather.js');
let login = require('./routes/login.js');
let fs = require('fs').promises;
//Modules

exports.processRoute =  async function(request, response, route){ 
    // Load base HTML template
    let base =  await fs.readFile('./templates/base.html');
    
    // Check if route is empty 
    if (route.length === 0){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(base);
        }
    else {
        let stage = route.shift();
        // Check which route stage to process
         if (stage === 'newProfiles') {
            newProfiles.processRoute(request, response, route);   
        }

         else if (stage === 'login') {
           await login.processRoute(request, response, route);   
        }

         else if (stage === 'WeatherPage') {
            await WeatherPage.processRoute(request, response, route);
        }
        
         else if (stage === 'profiles') {
            profiles.processRoute(request, response, route);   
        }
        else {
            // Handle 404 error if stage not found
            response.writeHead(404, {'Content-Type' : 'text/plain'});
            response.end('Error 404 - Not found!');
        }
        }

        };


        