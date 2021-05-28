#!/usr/bin/env node
const R = require("ramda");

let nums = [4, -5, 3, 2, -1, 7, -6, 8, 9];

let [ neg, pos ] = R.partition(e => e < 0, nums);
console.log(neg);
console.log(pos);
