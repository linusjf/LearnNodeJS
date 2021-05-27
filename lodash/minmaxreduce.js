#!/usr/bin/env node
let vals = [1, 2, 3, 4, 5];
const [initial] = vals;

const min = vals.reduce((current, next) => Math.min(current, next), initial);
const max = vals.reduce((current, next) => Math.max(current, next), initial);

console.log(`The minimum is: ${min}`);
console.log(`The maximum is: ${max}`);
