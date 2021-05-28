#!/usr/bin/env node
const collect = require("collect.js");

const nums = [1, 2, 3, 4, 5];
let sum = 0;

const data = collect(nums);

data.each((item) => {
  sum += item;
});

console.log(`The sum of values: ${sum}`);
