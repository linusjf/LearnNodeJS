#!/usr/bin/env node
const collect = require("collect.js");

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let data = collect(nums);

let output = data.implode("-");
console.log(output);

const users = [
  { name: "John Doe", occupation: "gardener" },
  { name: "Adam Forsythe", occupation: "writer" },
  { name: "Peter Smith", occupation: "programmer" },
  { name: "Lucy Black", occupation: "teacher" }
];

data = collect(users);

output = data.implode("name", ",");
console.log(output);
