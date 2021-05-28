#!/usr/bin/env node
const collect = require("collect.js");

const nums = ["a", "b", "c", "d", "e", "f", "g", "h"];

const data = collect(nums);

console.log(data.nth(2).all());
console.log(data.nth(3).all());
console.log(data.nth(4).all());
