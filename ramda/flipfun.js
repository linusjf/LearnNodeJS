#!/usr/bin/env node
const R = require("ramda");

let val = R.subtract(2, 10);
console.log(val);

let val2 = R.flip(R.subtract)(2, 10);
console.log(val2);
