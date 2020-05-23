const express = require("express");
const path = require("path");
const Proxy = require("http-proxy").createProxyServer();
const config = require(path.join(__dirname, "../config/global.json"));
const port = config.Server.settings.port;
const app = express();
const {
  handleCameraStreamSocket,
} = require("../handlers/cameraStream/streamSocket");
const ProxyServer = "http://localhost:" + config.Proxy.settings.port;
const { piCamera, pigpio } = require("../dependancySwitch");

/**
 * Pin initializations, will be mapping pins to the global json
 */
const pinNeedingReset = [];
// example and test
const Gpio = pigpio.Gpio;
const ledRed = new Gpio(4, { mode: Gpio.OUTPUT });

pinNeedingReset.push(ledRed);
/**
 * WebSocket Configuration
 */
const io = require("socket.io")(config.Server.settings.socket, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
  path: "/",
  serveClient: true,
  origins: "*:*",
  cookie: true,
  pingInterval: 500,
  pingTimeout: 500,
  upgradeTimeout: 500,
  allowUpgrades: true,
  cookie: "emiga_stream",
  cookiePath: "/",
  cookieHttpOnly: true,
});

// handlers for the /stream sockets
const allSockets = io.of("/stream").on("connection", (socket) => {
  // just for sockets connected to the /stream
  handleCameraStreamSocket(socket, allSockets);
});

allSockets.on("connection", function (socket) {
  console.log("CONNECTED");
});
/**
 * Run Proxy Server
 */
app.all("/*", function (req, res) {
  Proxy.web(req, res, { target: ProxyServer });
});

app.listen(port, () =>
  console.log(
    `\x1b[40m`,
    `\x1b[32m`,
    `
    [+] pi4         : http://192.168.68.107:${port}
    [+] Server         : http://localhost:${port}
    [+] Socket         : ws://localhost:${config.Server.settings.port}
    [~] Running Server...
`,
    `\x1b[0m`
  )
);

process.on("SIGINT", function () {
  //on ctrl+c, clear pins to prevent annoying bugs
  console.log("closing signal");
  for (let p of pinNeedingReset) {
    p.digitalWrite(0);
  }

  process.exit(); //exit completely
});
