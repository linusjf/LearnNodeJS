#!/usr/bin/env node
const collect = require("collect.js");

const nums = [1, 3, 2, 6, 5, 4];
const data = collect(nums);

const val = data.sort()
  .tap((col) => console.log(col.all()))
  .chunk(2)
  .tap((col) => console.log(col.toArray()))
  .reduce((c, e) => c + e.get(0) * e.get(1));

console.log(val);
