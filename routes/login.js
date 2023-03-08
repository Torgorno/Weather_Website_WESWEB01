let fs = require('fs').promises;
let querystring = require('querystring');
let mongoClient = require('mongodb').MongoClient;
//Modules

exports.processRoute = async function(req, res) { 
  try {
    let data = await fs.readFile('./templates/login.html', 'utf8');
    // If request method is POST, attempt to login user
    if (req.method === 'POST') {
      let formData = '';
      req.on('data', function(chunk) {
        formData += chunk;
      });
      req.on('end', async function() {
        let dbConnection;
        try {
          dbConnection = await mongoClient.connect('mongodb://127.0.0.1:27017');
          let dbo = dbConnection.db('WeatherDataBase');
          let {username, password} = querystring.parse(formData);  // Parse form data to get username and password
          let dbres = await dbo.collection('UserProfiles').findOne({username, password}); 

            // If user exists, set cookie and redirect to their profile
          if (dbres) {
            res.setHeader('Set-Cookie', `username=${username};`);
            res.writeHead(302, {'Location': `/profiles?profileid=${username}`});
            res.end();


            // If user does not exist, display error message
          } else {
            data = data.replace('{message}', 'Invalid username or password');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
          }
        } catch (err) {
          console.error(err);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
        } finally {
          dbConnection.close();
        }
      });

    } else {            // If request method is not POST, display login form
      data = data.replace('{message}', '');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  }
};
