#!/usr/bin/env node
const {Liquid} = require("liquidjs");
const engine = new Liquid();

let nums = [5, 3, 2, 4, 1];
let ctx = { data: nums};

engine
  .parseAndRender("Sorted data: {{ data | sort }}", ctx)
  .then(console.log).
  catch(console.error);
