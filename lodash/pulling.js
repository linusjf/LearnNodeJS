#!/usr/bin/env node
const _ = require("lodash");

let nums = [1, 2, 3, 1, 2, 2, 4, 5, 7, 8];
 
_.pull(nums, 1, 2);
console.log(nums);
