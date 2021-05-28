#!/usr/bin/env node
const R = require("ramda");

let res = R.call(R.add, 1, 2);
console.log(res);

console.log(R.call(R.repeat, "x")(5));
R.call(console.log, [1, 2, 3]);
