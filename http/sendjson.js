#!/usr/bin/env node
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/now") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ now: new Date() }));
    res.end();
  } else {
    res.end("Invalid request");
  }
});
server.listen(8080);
console.log("server running on port 8080");
