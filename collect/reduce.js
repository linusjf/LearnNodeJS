#!/usr/bin/env node
const collect = require("collect.js");

const nums = [1, 2, 3, 4, 5, 6];

const data = collect(nums);

const val = data.reduce((c, e) => { return e += c; });
console.log(val);

const val2 = data.chunk(2).reduce((c, e) => { 
  return c + e.get(0) * e.get(1); 
}, 0);

console.log(val2);
