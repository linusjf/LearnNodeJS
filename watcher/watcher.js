#!/usr/bin/env node

"use strict";
const fs = require("fs");
const watcher = fs.watch("touch.txt");
watcher.on("change", function(event, filename) {
    console.log(`${event} on file ${filename}`);
});