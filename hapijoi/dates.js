#!/usr/bin/env node
const Joi = require("@hapi/joi");

const schema = Joi.object().keys({

  timestamp: Joi.date().timestamp(),
  isodate: Joi.date().iso(),
  registered: Joi.date().greater("2018-01-01")
});

let timestamp = 1559761841;
let isodate = "1970-01-19T01:16:01.841Z";
let registered = "2019-02-12";

let data = { timestamp, isodate, registered };

const { error, value } = schema.validate(data);

if (error) {
  console.log(error.details);
} else {
  console.log(value);
}
