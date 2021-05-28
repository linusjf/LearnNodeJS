#!/usr/bin/env node
const R = require("ramda");

let nums = [-3, -1, 0, 2, 3, 4, 5, 6, 7];

let res = R.filter(x => x > 0, nums);
console.log(res);

let res2 = R.filter(x => x < 0, nums);
console.log(res2);

const isEven = x => x % 2 === 0;
 
let filtered = R.filter(isEven, nums); 
console.log(filtered);

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

console.log(R.filter(user => user.age >= 70, users));
