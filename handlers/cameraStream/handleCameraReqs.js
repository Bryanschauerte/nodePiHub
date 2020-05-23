const path       = require('path');
// var fs = require('fs'); //require filesystem module
module.exports.handleCameraReqs = (req, res) =>{
const aPath = path.join(__dirname+ '/index.html')
console.log(aPath, 'APATH')
    res.sendFile(aPath)
    // fs.readFile(__dirname + '/index.html', function(err, data) {
    //     if (err) {
    //       res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
    //       return res.end("404 Not Found");
    //     }
    //     res.sendFile(path.join(camera+'/stream.html'))
    //     res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    //     res.write(data); //write data from index.html
    //     return res.end();
    //   });

}