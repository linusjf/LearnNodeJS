#!/usr/bin/env node
const Joi = require("joi");

const schema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required()
});

let username = "Roger Brown";
let email = "roger@example";
let correct = "roger@example.com";

let data = { username, email };
console.log(data);
let correctData = { username: username, email: correct };
console.log(correctData);

let {error, value} = schema.validate(data);
console.error(error);
console.log(value);
let {err, val} = schema.validate(correctData);
if (err) {
  console.error(err);
  console.log(val);
}

async function main() {
  try {
    await schema.validateAsync(data);
  }
  catch (err) {
    console.error(err.message);
  }
  try {
    await schema.validateAsync(correctData);
  }
  catch (err) {
    console.error(err.message);
  }
}

main();
