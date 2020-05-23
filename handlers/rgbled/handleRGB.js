var fs = require('fs'); //require filesystem module

module.exports.handleRGB = (req, res) =>{ //what to do on requests to port 8080
    console.log('hit', __dirname + './rgb.html')
    fs.readFile(__dirname + '/rgb.html', function(err, data) { //read file rgb.html in public folder
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
      res.write(data); //write data from rgb.html
      return res.end();
    });
  }
