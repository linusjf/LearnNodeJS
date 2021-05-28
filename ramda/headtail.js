#!/usr/bin/env node
const R = require("ramda");

let nums = [2, 4, 6, 8, 10];

console.log(R.head(nums));
console.log(R.tail(nums));
console.log(R.init(nums));
console.log(R.last(nums));
