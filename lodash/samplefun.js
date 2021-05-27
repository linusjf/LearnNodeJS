#!/usr/bin/env node
const _ = require("lodash");

let words = ["sky", "wood", "forest", "falcon", 
  "pear", "ocean", "universe"];

let word = _.sample(words);
console.log(word);
