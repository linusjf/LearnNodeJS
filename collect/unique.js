#!/usr/bin/env node
const collect = require("collect.js");
const nums = [1, 1, 1, 2, 4, 4, 5];
const data = collect(nums);
const unique_data = data.unique();
console.log(unique_data.all());
