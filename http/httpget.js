#!/usr/bin/env node
const http = require("http");
const options = {
  hostname: "webcode.me",
  port: 80,
  path: "/",
  method: "GET"
};

let req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (err) => {
  console.error(err);
});
req.end();

req = http.get({ host: "webcode.me", path: "/" }, (res) => {
  // Continuously update stream with data
  let content = "";
  res.on("data", (chunk) => {
    content += chunk;
  });
  res.on("end", () => {
    console.log(content);
  });
});
req.end();
