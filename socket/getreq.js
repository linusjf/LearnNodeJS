#!/usr/bin/env node
var net = require("net");
var host = "webcode.me";
var port = 80;
var socket = new net.Socket();
socket.connect(port, host, () => {
  socket.write("GET / HTTP/1.0\r\n\r\n");
});
socket.on("data", (data) => {
  console.log(`${data}`);
  socket.destroy();
});
