#!/usr/bin/env node
const collect = require("collect.js");

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

const data = collect([collect(nums1), 
  collect(nums2)]);

console.log(data.all());
console.log(data.toArray());
