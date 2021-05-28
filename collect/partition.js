#!/usr/bin/env node
const collect = require("collect.js");

const nums = [-1, 2, 3, -4, 5, 7, -2];

const data = collect(nums);

const [negative, positive] = data.partition(e => {
  return e < 0 && e != 0;
});

console.log(positive.all());
console.log(negative.all());
