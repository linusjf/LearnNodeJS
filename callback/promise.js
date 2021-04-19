#!/usr/bin/env node

var pr = require("./taskspr.js")
pr.concatP("hello, ", "world")
 .then(pr.upperP.bind(this))
 .then(pr.decorP.bind(this))
  .then(console.log) 
// *HELLOWORLD*
