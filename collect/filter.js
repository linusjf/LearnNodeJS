#!/usr/bin/env node
const collect = require("collect.js");
const nums = [-1, 2, -3, 4, -5, 6, 7, 8, -9, 0];
const data = collect(nums);
const filtered = data.filter((val, _) => val > 0); 
console.log(filtered.all());
