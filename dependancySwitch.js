const { utils } = require("./utils");

// This is where you should stick your mocks/pi deps

let pigpio;
let piCamera;
const isNotOnPi = utils.notOnPi();

if (isNotOnPi) {
  piCamera = require("./picam");
  pigpio = require("./test-pigpio");
  console.log("using built pi mocks");
} else {
  piCamera = require("pi-camera");
  pigpio = require("pigpio");
  console.log("using real pi crap");
}

module.exports.pigpio = pigpio;
module.exports.piCamera = piCamera;
