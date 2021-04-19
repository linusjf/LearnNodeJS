#!/usr/bin/env node

"use strict";
const path = require("path");
const fullPath = path.join("..", "readme.md");
console.log(fullPath);

const touchFullPath = path.join(__dirname, "touch.txt");
console.log(touchFullPath);

const parts = path.parse(touchFullPath);
console.log(parts);