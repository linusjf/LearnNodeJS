#!/usr/bin/env node

const fs = require("fs"); 
const http = require("http"); 
const server = http.createServer((request, response) => { 
 response.writeHead(200, {"Content-Type": "text/html"});
 var stream = fs.createReadStream("./index.html"); 
 stream.pipe(response); 
}); 
server.listen(8000); 
