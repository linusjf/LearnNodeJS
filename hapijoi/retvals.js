#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.object().keys({
  username: Joi.string().required(),
  born: Joi.date().required()
});

let username = "Roger Brown";
let born = "1988-12-11";

let data = { username, born };

const { err, value } = schema.validate(data);

if (err) {
  console.log(err.details);
} else {
  console.log(value);
}
