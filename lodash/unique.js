#!/usr/bin/env node
let vals = [1, 1, 2, 2, 3, 4, 5, 5];

let unique_vals = vals.reduce((current, next) => {
  if (current.includes(next)) {
    return current;
  } else {
    return [...current, next];
  }
}, []);
console.log(unique_vals);
