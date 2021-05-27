#!/usr/bin/env node
const _ = require("lodash");

let nums = [1, 2, 3, 4, 5, 6];

let nums2 = _.take(nums);
let nums3 = _.take(nums, 2);
let nums4 = _.takeRight(nums, 3);

console.log(nums2);
console.log(nums3);
console.log(nums4);
