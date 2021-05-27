#!/usr/bin/env node
let vals = [[0, 1], [2, 3], [4, 5], [5, 6]];
let flattened = vals.reduce((arr, next) => arr.concat(next), []);
console.log(flattened);
