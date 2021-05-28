#!/usr/bin/env node
const collect = require("collect.js");
const nums = [1, 2, 3, 4];
const nums2 = [3, 4, 5, 6];
const data = collect(nums);
const data2 = collect(nums2);
const difference = data.diff(data2);
console.log(difference.all());
