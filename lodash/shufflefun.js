#!/usr/bin/env node
const _ = require("lodash");

let words = ["sky", "wood", "forest", "falcon", 
  "pear", "ocean", "universe"];

console.log(_.shuffle(words));
console.log(_.shuffle(words));
console.log(_.shuffle(words));
console.log(words);
