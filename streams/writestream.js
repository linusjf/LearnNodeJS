#!/usr/bin/env node

const fs = require("fs");
var sourceFile = fs.createReadStream("./index.html");
var destinationFile = fs.createWriteStream("./dest.html");
sourceFile.on("data", function(chunk) {
  destinationFile.write(chunk);
});
