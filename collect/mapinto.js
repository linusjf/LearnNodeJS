#!/usr/bin/env node
const collect = require("collect.js");
const User = function (name, age) {
  this.name = name;
  this.age = age;
};
const users = [
  { name: "John Doe", age: 34 },
  { name: "Peter Smith", age: 43 },
  { name: "Bruce Long", age: 40 },
  { name: "Lucy White", age: 54 },
];
const data = collect(users);
console.log(data);
const objects = data.mapInto(User);
console.log(objects.all());
