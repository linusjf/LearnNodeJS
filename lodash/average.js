#!/usr/bin/env node
let vals = [1, 2, 3, 4, 5];
let average = vals.reduce((curr, next, idx, array) => {
  curr += next;
  if (idx === array.length - 1) { 
    return curr / array.length;
  } else { 
    return curr;
  }
});
console.log(average);
