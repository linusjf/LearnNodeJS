#!/usr/bin/env node
let greet = (message) => (name) => {
  return `${message} ${name}!`;
};

let helloGreet = greet("Hello,"); 

console.log(greet("Good day,")("Lucia"));
console.log(helloGreet("Peter"));
