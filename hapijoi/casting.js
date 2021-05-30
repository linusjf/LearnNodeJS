#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.object().keys({
  timestamp: Joi.date().timestamp(),
  val: Joi.number()
});

let val = "23543";
let timestamp = 1559761841;

let data = { val, timestamp };

const { error, value } = schema.validate(data);

if (error) {
  console.log(error.details);
} else {
  console.log(value);
}
