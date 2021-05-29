#!/usr/bin/env node
let net = require("net");

let host = "192.168.0.23";
let port = 25;

let from = "john.doe@example.com";
let to = "root@core9";
let name = "John Doe";
let subject = "Hello";
let body = "Hello there";

let socket = new net.Socket();

socket.connect(port, host, () => {

  socket.write("HELO core9\n");
  socket.write(`MAIL FROM: <${from}>\n`);
  socket.write(`RCPT TO: <${to}>\n`);
  socket.write("DATA\n");
  socket.write(`From:${name}\n`);
  socket.write(`Subject:${subject}\n`);
  socket.write(`${body}`);
  socket.write("\r\n.\r\n");
  socket.write("QUIT\n");
});

socket.on("data", data => {
  console.log(`${data}`);
});

socket.on("close", () => {
  socket.destroy();
});
