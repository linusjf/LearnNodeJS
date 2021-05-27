#!/usr/bin/env node
const _ = require("lodash");

function multiply(a, b, c) {

  return a * b * c;
}

let curried = _.curry(multiply);

let ret = curried(2)(3)(4);
console.log(ret);
