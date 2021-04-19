"use strict";

const fns = require("./tasks.js");
module.exports = {

  concatP : function(
      a, b) { return new Promise(resolve => { fns.concat(a, b, resolve); }) },
  upperP : function(
      a) { return new Promise(resolve => { fns.upper(a, resolve); }) },
  decorP : function(
      a) { return new Promise(resolve => { fns.decor(a, resolve); }) }
};
