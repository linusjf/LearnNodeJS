#!/usr/bin/env node
setInterval(() => console.log("function 1"), 1000)
setInterval(() => {
 console.log("function 2")
 while (true) { }
}, 1000)
console.log("starting")
