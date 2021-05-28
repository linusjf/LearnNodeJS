#!/usr/bin/env node
const R = require("ramda");

const isPositive = x => x > 0;
 
let values = [-1, 0, -4, 5, 6, -1, 9, -2];

let val = R.find(isPositive, values);
console.log(val);

let val2 = R.findLast(isPositive, values);
console.log(val2);

const users = [
  { name: "John", age: 25 },
  { name: "Lenny", age: 51 },
  { name: "Andrew", age: 43 },
  { name: "Peter", age: 81 },
  { name: "Anna", age: 43 },
  { name: "Albert", age: 76 },
  { name: "Adam", age: 47 },
  { name: "Robert", age: 72 }, 
  { name: "Robert", age: 26 }, 
];

console.log(R.find(R.propEq("name", "Robert"))(users));
console.log(R.find(R.propEq("age", 81))(users));
