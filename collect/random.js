#!/usr/bin/env node
const collect = require("collect.js");

let nums = [1, 2, 3, 4, 5, 6, 7, 8];

const data = collect(nums);

let r1 = data.random();
console.log(r1);

let r2 = data.random(2);
console.log(r2.all());
