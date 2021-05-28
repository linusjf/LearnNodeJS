#!/usr/bin/env node
const collect = require("collect.js");

const words = ["forest", "wood", "sky", "cloud"];

const data = collect(words);

if (data.every(e => e.length > 2)){
  console.log("Each word has more than 2 letters");
} else {
  console.log("There is at least one word that does not have more than 2 letters");
}
