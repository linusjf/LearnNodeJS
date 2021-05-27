#!/usr/bin/env node
const _ = require("lodash");

function message()
{
  console.log("Some message");
}

_.delay(message, 150);
console.log("Some other message");
