let fs = require('fs').promises;
let mongoClient = require('mongodb').MongoClient;
let querystring = require('querystring');
//Modules
async function get(request, response) {
    try {
        // Read HTML template file
        let template = await fs.readFile('./templates/newProfiles.html', {encoding: 'utf8'});
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(template);     
    }
    catch(e){ 
        response.writeHead(500, {'Content-Type':'text/plain'});
        response.end('Error 500 - blargh');
    }
    finally{

    }
}

// Handle POST requests
async function post(request, response) {
  let data = '';
  request.on('data', function (chunk) {
    data += chunk;
  });
  request.on('end', async function (req, res) {
    let dbconn;
    try {
        // Check if all required fields are provided inside try-catch.
      let formData = querystring.parse(data);
      if (formData.username && formData.password && formData['fav-positions']) {
        dbconn = await mongoClient.connect('mongodb://127.0.0.1:27017');
        let dbo = dbconn.db('WeatherDataBase');
        let users = dbo.collection('UserProfiles');

        // Check if user already exists
        let exisistingUser = await users.findOne({ username: formData.username });

        if (exisistingUser) {

             // Set response if user already exists

          response.writeHead(200, { 'Content-Type': 'text/plain' });
          response.end(`User "${formData.username}" already exists!`);
        } else {
          await users.insertOne({
            username: formData.username,
            password: formData.password,
            favPositions: formData['fav-positions'].split(','),
          });
          console.log(`User "${formData.username}" registered successfully!`);
          // Set response for successful registration
          response.setHeader('Set-Cookie', `username=${formData.username};`, `password=${formData.password};`);
          response.writeHead(303, { Location: '/profiles?profileid' + formData.username });
          response.end();
        }
      } else {
         // Set response if all fields are not provided
        response.writeHead(422, { 'Content-Type': 'text/plain' });
        response.end('Error - All fields were not provided');
      }
    } catch (e) {
      console.log(e);
      response.writeHead(500, { 'Content-type': 'text/plain' });
      response.end('Error 500 ');
    } finally {
      if (dbconn) dbconn.close();
    }
  });
}

// Exports the route processing function With POST and GET requests
exports.processRoute = function(request, response, route) {
    if (request.method === 'POST'){
        post(request,response);
    }
    else {
        get(request, response);
    }
};

