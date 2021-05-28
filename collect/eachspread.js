#!/usr/bin/env node
const collect = require("collect.js");

const users = [
  ["John Doe", "gardener"], ["Peter Smith", "programmer"],
  ["Lucy Black", "teacher"]
];

const data = collect(users);

data.eachSpread((user, occupation) => {
  console.log(`${user} is a ${occupation}`);
});
