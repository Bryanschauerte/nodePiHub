const express = require("express");
const path = require("path");
const config = require(path.join(__dirname, "../config/global.json"));
// const { piCamera } = require("../dependancySwitch");
const camera = path.join(
  __dirname,
  "../" + config.Proxy.settings.pi_camera_path
);
const port = config.Proxy.settings.port;
const app = express();
const { utils } = require("../utils");

// const {handleRGB} = require('../handlers/rgbled/handleRGB')
// const {handleSimpleCar} = require('../handlers/simpleCar/handleSimpleCar')
// const {rgbSocket} = require('../handlers/rgbled/rgbSocket')
// const {handleCameraStreamSocket} = require('../handlers/cameraStream/streamSocket')
const {
  handleCameraReqs,
} = require("../handlers/cameraStream/handleCameraReqs");
// http://localhost:8002/stream
console.log("myArgs: ", utils.notOnPi());
const { PiCamera } = piCamera;
const x = new PiCamera({});
x.snap().then((d) => console.log(d, "d"));

/**
 *   camera
 */
app.use(express.static(path.join(__dirname, "../public")));
app.get("/stream", handleCameraReqs);

app.listen(port, () =>
  console.log(
    `\x1b[40m`,
    `\x1b[32m`,
    `
    [+] Proxy Server   : http://localhost:${port}
    [+] Storage Path   : ${camera}
    [~] Running Proxy Server...
`,
    `\x1b[0m`
  )
);
