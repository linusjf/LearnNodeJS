#!/usr/bin/env node
const _ = require("lodash");

let users = [
  { name: "John", age: 25 },
  { name: "Lenny", age: 51 },
  { name: "Andrew", age: 43 },
  { name: "Peter", age: 81 },
  { name: "Anna", age: 43 },
  { name: "Albert", age: 76 },
  { name: "Adam", age: 47 },
  { name: "Robert", age: 72 }
];

let u1 = _.find(users, {name: "Adam"});
console.log(u1);

let u2 = _.find(users, (u) => { return u.age > 60; });
console.log(u2);

let u3 = _.findLast(users, (u) => { return u.age > 60; });
console.log(u3);
