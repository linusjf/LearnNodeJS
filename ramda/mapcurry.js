#!/usr/bin/env node
const R = require("ramda");
let addOneToAll = R.map(R.add(1));
let res = addOneToAll([1,2,3]);
console.log(res);
