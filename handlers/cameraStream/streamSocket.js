module.exports.handleCameraStreamSocket = (socket, all, PiCamera) => {
  // should pass config if not in dev

  let piCameraInitiated;
  let streamInterval = false;
  socket.on("ready", (data) => {
    // may want to pass config from socket...
    piCameraInitiated = new PiCamera({});
    console.log(data, "ready data");
    streamInterval = setInterval(() => {
      console.log("intercal");
      piCameraInitiated.snap().then((location) => {
        socket.emit("newImage", location);
      });
    }, 1000);
  });

  all.on("all", (data) => {
    console.log(data, "connection");
  });

  socket.on("disconnect", () => {
    piCameraInitiated = false;
    if (streamInterval) {
      clearInterval(streamInterval);
    }

    console.log(
      "disconnected and killed camera(maybe. might need to do something here)"
    );
    all.emit("user disconnected");
  });
};
