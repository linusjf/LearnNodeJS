#!/usr/bin/env node
const http = require("http");
const server = http.createServer(function (req, res) {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is home page.</p></body></html>");
    res.end();
  } else if (req.url == "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is contact page</p></body></html>");
    res.end();
  } else if (req.url == "/admin") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is admin page</p></body></html>");
    res.end();
  } else {
    res.end("Invalid request");
  }
});
server.listen(8080);
console.log("server running on port 8080");
