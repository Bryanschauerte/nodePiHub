const path = require("path");
// var fs = require('fs'); //require filesystem module

// http://localhost:8002/stream
module.exports.handleCameraReqs = (req, res) => {
  const aPath = path.join(__dirname + "/index.html");
  console.log(aPath, "APATH");
  res.sendFile(aPath);
};
