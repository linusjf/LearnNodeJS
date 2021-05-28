#!/usr/bin/env node
const R = require("ramda");

let nums = [3, 5, 7, 8, 2, 1];

let res = R.apply(Math.min, nums);
console.log(res);

let res2 = R.apply(Math.max, nums);
console.log(res2);
