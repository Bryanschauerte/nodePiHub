module.exports.rgbSocket = (socket, pinConfigObject) =>{

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  socket.on('rgbLed', function(data) { //get light switch status from client
    console.log(data); //output data from WebSocket connection to console

    //for common cathode RGB LED 0 is fully off, and 255 is fully on
    redRGB=parseInt(data.red);
    greenRGB=parseInt(data.green);
    blueRGB=parseInt(data.blue);

    pinConfigObject.ledRed.pwmWrite(redRGB); //set RED LED to specified value
    pinConfigObject.ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
    pinConfigObject.ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value
  });

  return socket
}