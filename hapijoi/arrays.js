#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.array().min(2).max(10);

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];

const { error, value } = schema.validate(data);

if (error) {
  console.log(error.details);
} else {
  console.log(value);
}
