#!/usr/bin/env node
const {Liquid} = require("liquidjs");
const path = require("path");

const engine = new Liquid({
  root: path.resolve(__dirname, "views/"),
  extname: ".liquid"
});

let ctx = { users: [{ name: "Peter", age: 24 }, { name: "Lucy", age: 34 }] };

engine
  .renderFile("users", ctx)
  .then(console.log);
