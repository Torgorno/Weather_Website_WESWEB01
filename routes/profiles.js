let fs = require('fs').promises;
let URL = require('url').URL;
let mongoClient = require('mongodb').MongoClient;

exports.processRoute = async function(request, response, route){      
    let dbConnection;
    try{
        dbConnection = await mongoClient.connect('mongodb://127.0.0.1:27017');
        let dbo = dbConnection.db('WeatherDataBase');
        // Parse the URL and check if it has a 'profileid'
        let tmpURL = new URL('http://' + request.headers.host + request.url);
        if (tmpURL.searchParams.has('profileid')){ // show a single profile    
            let profileTemplate = await fs.readFile('./templates/profiles.html', {encoding: 'utf8'});
            let dbres = await dbo.collection('UserProfiles').findOne({username: tmpURL.searchParams.get('profileid')});
            if (dbres){
                // Replaces placeholders in the template with data from the database
                profileTemplate = profileTemplate.replace('{{username}}', dbres.username);
               let favPositionsList = '';
            for (let i=0; i<dbres.favPositions.length; i++) {
                favPositionsList += `<a href="/WeatherPage?location=${dbres.favPositions[i]}">${dbres.favPositions[i]}</a>`;
            }

                favPositionsList += '';
                profileTemplate = profileTemplate.replace('{{favpositions}}', favPositionsList);
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(profileTemplate);
            }
            else{
                // If the profile doesn't exist in the database, return a 404 error
                response.writeHead(404, {'Content-Type':'text/plain'});
                response.end('Could not find profile');
            }
        }
        else{ 
            // shows a list of all profiles
            let profilelistTemplate = await fs.readFile('./templates/profilelist.html', {encoding: 'utf8'});
            let profilelistitemTemplate = await fs.readFile('./templates/profilelistitem.html',{encoding: 'utf8'});
            let dbres = await dbo.collection('UserProfiles').find({}).project({username:1, _id:0}).toArray();
            let profilelist = '';
            for (let i=0; i<dbres.length; i++){
                profilelist += profilelistitemTemplate.replaceAll('{{profileid}}', dbres[i].username);
            }
            profilelistTemplate = profilelistTemplate.replace('{{profilelistitems}}', profilelist);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(profilelistTemplate); 
        }
    }
    catch{
        //if error inside try-catch occurs, return 500
        response.writeHead(500, {'Content-Type':'text/plain'});
        response.end('Error 500 - Internal server error');
    }
    finally{
         // Close the database connection
        dbConnection.close();
    }
};
