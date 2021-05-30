#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.object().keys({
  age: Joi.number().min(18).max(129),
  price: Joi.number().positive(),
  experience: Joi.number().greater(5)
});

let age = 35;
let price = -124.3;
let experience = 6;

let data = { age, price, experience };

const { error, value } = schema.validate(data);

if (error) {
  console.log(error.details);
} else {
  console.log(value);
}
