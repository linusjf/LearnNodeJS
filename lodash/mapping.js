#!/usr/bin/env node
let vals = [1, 2, 3, 4, 5];

let mapped = vals.reduce((current, next) => {current.push(next * 2); return current;}, []);
console.log(mapped);
