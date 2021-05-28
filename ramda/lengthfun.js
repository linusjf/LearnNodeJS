#!/usr/bin/env node
const R = require("ramda");

let nums = [1, 2, 2, 2, 3, 3, 4, 5, 5, 5, 6, 7];

let n1 = R.length(nums);
console.log(n1);

let n2 = R.length(R.uniq(nums));
console.log(n2);
