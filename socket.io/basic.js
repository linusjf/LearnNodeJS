#!/usr/bin/env node

const express = require("express");
const app = express();
let http = require("http");
http = http.createServer(app);
const io = require("socket.io")(http);
/* eslint-disable */
io.on("connection", _socket => {
  console.log("a new user is connected");
});
/* eslint-enable */

io.on("connection", (socket) => {
  socket.on("hello-message", data => console.log(data));
  socket.emit("hello-server", {
    message: "hello, clients"
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
