#!/usr/bin/env node
const _ = require("lodash");

let nums = [1, 2, 3, 4, 5, 6, 7, 8];
 
console.log(_.nth(nums, 3));
console.log(_.nth(nums, -3));
