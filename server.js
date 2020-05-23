
var fs = require('fs'); //require filesystem module
const path       = require('path');
var app = require('express')();
const {handleRGB} = require('./handlers/rgbled/handleRGB')
const {handleSimpleCar} = require('./handlers/simpleCar/handleSimpleCar')
const {rgbSocket} = require('./handlers/rgbled/rgbSocket')
const {handleCameraStreamSocket} = require('./handlers/cameraStream/streamSocket')
const {handleCameraReqs} = require('./handlers/cameraStream/handleCameraReqs')

const buildServer = ({pigpio, piCamera}, http, io) =>{
    app.get('/hi', (req, res) => {
        res.send('<h1>Hello world</h1>');
      });
      // route and handlers
      const publicPath = path.join(__dirname,"/public")
      console.log(publicPath, 'PPPPP')
      app.use(publicPath);
    app.get('/', handleRGB)
    app.get('/camera', handleCameraReqs)
    app.get('/simpleCar', handleSimpleCar)
const {PiCamera} = piCamera
const x = new PiCamera({})
console.log(x.record().then(n=> console.log('nnn', n)), 'piCamera')
    http = http.createServer(app)
    io= io(http);

    var Gpio = pigpio.Gpio, //include pigpio to interact with the GPIO
    ledRed = new Gpio(4, {mode: Gpio.OUTPUT}), //use GPIO pin 4 as output for RED
    ledGreen = new Gpio(17, {mode: Gpio.OUTPUT}), //use GPIO pin 17 as output for GREEN
    ledBlue = new Gpio(27, {mode: Gpio.OUTPUT}), //use GPIO pin 27 as output for BLUE
    redRGB = 0, //set starting value of RED variable to off (0 for common cathode)
    greenRGB = 0, //set starting value of GREEN variable to off (0 for common cathode)
    blueRGB = 0; //set starting value of BLUE variable to off (0 for common cathode)
    const pinArrayForReset = [ledRed, ledGreen, ledBlue]
    //RESET RGB LED
    for(let p of pinArrayForReset){
      p.digitalWrite(0)
     }


    
    http.listen(8080); //listen to port 8080
    
console.log('listening')
    
    io.sockets.on('connection', function (socket) {// Web Socket Connection
        // home route for handleRGB
        rgbSocket(socket, {ledRed, ledBlue, ledGreen})
        handleCameraStreamSocket(socket)
    });
    
    process.on('SIGINT', function () { //on ctrl+c
        console.log('closing signal')
       for(let p of pinArrayForReset){
        p.digitalWrite(0)
       }

      process.exit(); //exit completely
    });

}
module.exports = buildServer