#!/usr/bin/env node
const R = require("ramda");

console.log(R.prop("name", { name: "John", age: 25 }));
console.log(R.prop("age", { name: "John", age: 25 }));
