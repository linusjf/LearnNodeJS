#!/usr/bin/env node
const _ = require("lodash");

let vals = [1, 2, "good", [1, 2], {name: "Peter", age: 32}];

console.log(vals);
console.log("");
vals.forEach( (e) => {
  if (_.isNumber(e)) {
    console.log(`${e} is a number`);
  }
  if (_.isString(e)) {
    console.log(JSON.stringify(e) + " is a string");
  }
  if (_.isArray(e)) {
    console.log(JSON.stringify(e) + " is an array");
  }
  if (_.isObject(e)) {
    console.log(JSON.stringify(e) + " is an object");
  }
});
