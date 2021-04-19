#!/usr/bin/env node
"use strict";
setInterval(() => console.log("function 1"), 1000);
setInterval(() => {
 console.log("function 2");
  while (true) { 
    // empty block
  }
}, 1000);
console.log("starting");
