#!/usr/bin/env node
const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  let q = url.parse(req.url, true).query;
  let msg = `${q.name} is ${q.age} years old`;
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(msg);
  res.end();
}).listen(8080);

console.log("server running on port 8080");
