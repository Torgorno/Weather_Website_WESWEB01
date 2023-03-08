let fs = require('fs').promises;
let querystring = require('querystring');
//Modules

// Async function that provides the weather html file with data
exports.processRoute = async function(req, res) {
  // Serve HTML file with weather data
  try {
    // Reads the HTML file
    let data = await fs.readFile('./public/WeatherPage.html', 'utf8');
    // Get the location from the query parameters in the URL, or set a default location
    let url = new URL(`http://${req.headers.host}${req.url}`);
    let location = url.searchParams.get('location') || 'Jönköping'; // Default location before typing in

    // Generate a random temperature and condition
    let temperature = Math.floor(Math.random() * 50);
    let condition = ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)];

    // Replace placeholders in the HTML file with generated data
    data = data.replace('{temperature}', temperature);
    data = data.replace('{condition}', condition);
    data = data.replace('{location}', location);

    // Send response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  }
}
