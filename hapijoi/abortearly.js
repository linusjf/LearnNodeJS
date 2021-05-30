#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.object().keys({
  username: Joi.string().min(2).max(30).required(),
  password: Joi.string().regex(/^[\w]{8,30}$/),
  registered: Joi.number().integer().min(2012).max(2019),
  married: Joi.boolean().required()
});

let username = "Roger Brown";
let password = "s#cret12";
let registered = "2011";
let married = false;

let data = { username, password, registered, married };
let options = { abortEarly: false };

const { error, value } = schema.validate(data, options);

if (error) {
  console.log(error.details);
} else {
  console.log(value);
}
