module.exports.handleCameraStreamSocket = (socket, all) => {
  socket.on("cat", (data) => {
    console.log(data, "kitty");
    socket.emit("newImage", data);
  });
  // socket.on("a message", (data) => {
  //   console.log(data, "server on a message");
  //   socket.emit("newImage", data);
  // });
  // all.emit('all', ()=>{})
  all.on("all", (data) => {
    console.log(data, "connection");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    all.emit("user disconnected");
  });
};
