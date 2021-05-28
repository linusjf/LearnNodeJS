#!/usr/bin/env node
const R = require("ramda");

const users = [
  { name: "John", age: 25 },
  { name: "Lenny", age: 51 },
  { name: "Andrew", age: 43 },
  { name: "Peter", age: 81 },
  { name: "Anna", age: 43 },
  { name: "Albert", age: 76 },
  { name: "Adam", age: 47 },
  { name: "Robert", age: 72 }
];

console.log(R.pluck("age", users));
console.log(R.pluck("name", users));
