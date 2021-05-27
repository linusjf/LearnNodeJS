#!/usr/bin/env node
let vals = [88, 28, 0, 9, 389, 420];
let reversed = vals.reduce((current, next) => {return [next, ...current];}, []);
console.log(reversed);
