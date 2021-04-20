#!/usr/bin/env node

const http = require("http");
const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  if (request.url === "/about") {
    response.write("<h1>About Node.js</h1>");
  } else {
    response.write("<h1>Hello from Node.js/h1>");
  }
  response.end();
});
server.listen(8000);
