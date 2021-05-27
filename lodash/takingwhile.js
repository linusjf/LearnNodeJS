#!/usr/bin/env node
const _ = require("lodash");

let nums = [1, -2, 3, 4, -5, 6, 7, -8, -9];

let nums2 = _.takeWhile(nums, (n) => { return n < 0; });
let nums3 = _.takeRightWhile(nums, (n) => { return n < 0; });

console.log(nums2);
console.log(nums3);
