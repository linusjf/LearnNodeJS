#!/usr/bin/env node
let vals = [1, 2, 3, 4, 5];

const initials = {
  min: Number.MAX_VALUE,
  max: Number.MIN_VALUE,
};

const min_max_vals = vals.reduce(min_max, initials);
console.log(min_max_vals);

function min_max(current, next) {
  return {
    min: Math.min(current.min, next),
    max: Math.max(current.max, next),
  };
}
