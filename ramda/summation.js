#!/usr/bin/env node
const R = require("ramda");

let nums = [2, 4, 6, 8, 10];
console.log(R.sum(nums));

console.log(R.sum(R.range(1, 11)));
