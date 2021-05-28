#!/usr/bin/env node
const collect = require("collect.js");
const nums = [1, 2, 3, 4, 5];
const data = collect(nums);
const tr_data = data.map(e => e * 2);
console.log(tr_data.all());
