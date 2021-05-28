#!/usr/bin/env node
const collect = require("collect.js");

const nums = [1, 2, -3, 4, -5, 6, 7, 8];
const data = collect(nums);

let fval = data.first();
console.log(fval);

let fneg = data.first(e => e < 0);
console.log(fneg);
