#!/usr/bin/env node
var net = require("net");
var host = "djxmmx.net";
var port = 17;
var socket = new net.Socket();

socket.connect(port, host, function() {
  socket.write("");
});
socket.on("data", (data) => {
  console.log(`${data}`);
  socket.destroy();
});
