#!/usr/bin/env node
const R = require("ramda");

console.log(R.range(1, 10));

let vals = R.range(2, 12);

vals.forEach(x => console.log(x));
