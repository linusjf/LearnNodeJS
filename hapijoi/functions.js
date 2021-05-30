#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.func().arity(2);

function add2int(x, y) {
  return x + y;
}

const { error, value } = schema.validate(add2int);
if (error) {
  console.log(error.details);
} else {
  console.log(value);
}
