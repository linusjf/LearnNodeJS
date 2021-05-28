#!/usr/bin/env node
const collect = require("collect.js");

const users = [
  { name: "John Doe", occupation: "gardener" },
  { name: "Adam Forsythe", occupation: "writer" },
  { name: "Peter Smith", occupation: "programmer" },
  { name: "Lucy Black", occupation: "teacher" }
];

const data = collect(users);

const sorted1 = data.sortBy("name");
console.log(sorted1.all());

const sorted2 = data.sortBy("occupation");
console.log(sorted2.all());
