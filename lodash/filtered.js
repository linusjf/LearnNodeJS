#!/usr/bin/env node
let vals = [-1, -2, 3, 4, -5, -6];

let filtered = vals.reduce((current, next) => {
  if (next > 0) {
    current.push(next * 2);
  }
  return current;
}, []);
console.log(filtered);
