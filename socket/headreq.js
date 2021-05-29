#!/usr/bin/env node
var net = require("net");
var host = "webcode.me";
var port = 80;
var socket = new net.Socket();

socket.connect(port, host, () => {
  socket.write("HEAD / HTTP/1.0\r\n");
  socket.write("Host: webcode.me\r\n");
  socket.write("User-Agent: Node.js HTTP client\r\n");
  socket.write("Accept: text/html\r\n");
  socket.write("Accept-Language: en-US\r\n");
  socket.write("Connection: close\r\n\r\n");
});

socket.on("data", (data) => {
  console.log(`${data}`);
  socket.destroy();
});
